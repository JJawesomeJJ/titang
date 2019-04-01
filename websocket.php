<?php
$server=new server();
global $time;
class server{
    private $addr="0.0.0.0";
    private $port="9502";
    public $time=0;
    public $redis;
    public $name;
    public $users=array(
    );
    function __construct(){
        $this->lock=new swoole_lock(SWOOLE_MUTEX);
        $this->server=new swoole_websocket_server($this->addr,$this->port);
        $this->server->set(array(
            'daemonize' => 0,
            'worker_num' => 4,
            'task_worker_num' => 10,
            'max_request' => 1000,
            'log_file' => ROOT_PATH . 'storage\\logs\\swoole.log'
        ));
        $this->redis = new Redis();
        $this->redis->connect("127.0.0.1",6379);
        $this->redis->delete("users");
        $this->server->on('open',array($this,'onopen'));
        $this->server->on('message',array($this,'onmessage'));
        $this->server->on('task', array($this, 'onTask'));
        $this->server->on('finish',array($this,'onfinish'));
        $this->server->on('close',array($this,'onclose'));
        $this->server->start();
    }
    public function onopen($server,$request){
        $this->time=$this->time+1;
        $message=array(
            'remote_addr'=>$request->server['remote_addr'],
            'request_time' => date('Y-m-d H:i:s', $request->server['request_time'])
        );
    }
    public function onmessage($server,$frame){
        $data=json_decode($frame->data);
        switch ($data->type){
            case 'init':
                //$this->users[$data->username]=$frame->fd;
                if($this->redis->exists('users')==false)
                {
                    $arr=array();
                    $this->redis->set('users',json_encode($arr));
                }
                $this->name=$data->username;
                $user = json_decode($this->redis->get('users'));
                if(gettype($user)=='object')
                {
                    $user=get_object_vars($user);
                }
                $user[$data->username] =$frame->fd;
                $this->redis->set('users', json_encode($user));
                $count=count($user);
                $response=array(
                    'type'=>'system',
                    'online'=>$user,
                    'count'=>$count,
                    'online_count'=>count($this->server->connections),
                    'time'=>$this->time
                );
                //$this->server->push($frame->fd,json_encode($response));
                $this->server->task($response);
                break;
            case 'chat':
                $source=$data->source;
                if($source=="system")
                {
                    if($data->check_code=="13036591969")
                    {
                        $response=$data->message;
                        $this->server->task($response);
                    }
                }
                else{
                    $to=$data->to;
                    $response=array(
                        $source=$data->source,
                        $message=$data->message,
                    );
                    $user=json_decode($this->redis->get('users'));
                    if(gettype($user)=='object')
                    {
                        $user=get_object_vars($user);
                    }
                    $this->server->push($user[$to],json_encode($response));
                }
                break;
            default:
                return false;
        }
    }
    public function onTask($server,$task_id,$form_id,$message){
        foreach ($this->server->connections as $fd)
        {
            $this->server->push($fd,json_encode($message));
        }
        $server->finish('Task'.$task_id.'Finished'.PHP_EOL);
    }
    public function onclose($server,$fd){
        $user=json_decode($this->redis->get('users'));
        if(gettype($user)=='object'){
            $user=get_object_vars($user);
        }
        unset($user[$this->name]);
        $this->redis->set("users",json_encode($user));
        $this->lock->lock();
        $this->lock->unlock();
    }
    public function onfinish(){

    }
}
?>