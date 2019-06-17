<template>
  <div id="home">
    <div class="container">
      <div class="imgbox">
        <ul>
          <li class="list1"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218377000&di=3a7c73526f0b23016413875dd947a4dd&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F59794edf0f0a6.jpg" alt=""></li>
          <li class="list2"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218377000&di=588b18d96aaf14bdaedee4511f0e52c7&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F59794f0c203ce.jpg" alt=""></li>
          <li class="list3"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218376999&di=e57c44d8e5d4a7d0ef497b561b5aa71c&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F5927819478467.jpg" alt=""></li>
          <li class="list4"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218376998&di=be31664d6c40d82fb5f767a4987b20d3&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F5%2F552db9ca6b69c.jpg" alt=""></li>
          <li class="list5"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218376997&di=5c0961087a1a366e17d4b1838642b62b&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F58ec73de890fd.jpg" alt=""></li>
          <li class="list6"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528218497579&di=1b32fc768ea44907f4bdcdd23094b2b8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F5850a9beece26.jpg" alt=""></li>
        </ul>
        <div class="linebar">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

    </div>
    <div class="ba">
    </div>
  </div>
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            li_name: null,
            list:null
        }
    },
    created(){
        //setTimeout(this.onload,3000);
        //this.show();
      this.react1();
      layer.msg('hello');
      this.menu("iconfont.icon-shouye");
    },
    mounted () {
        this.onload();
        this.show();
        this.react();
        this.line_color();
    },
    methods: {
        react() {
            var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
            var html = document.getElementsByTagName('html')[0];
            window.fontSize = view_width > 750 ? 750 / 20 : view_width / 20;
            html.style.fontSize = window.fontSize + 'px';
            console.log(html.style, fontSize);
        },
        react1(){
            $(window).resize(function () {
                var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
                var html = document.getElementsByTagName('html')[0];
                window.fontSize = view_width > 750 ? 750 / 20 : view_width / 20;
                html.style.fontSize = window.fontSize + 'px';
                console.log(html.style, fontSize);
            })
        },
        is_websocket(){

        },
        onload() {
            var list = document.querySelectorAll('div.imgbox>ul>li');
            this.list=list;
            var li_name1 = [];
            for (var item of list) {
                li_name1.push(item.classList[0]);
            }
            this.li_name = li_name1;
        },
        next_img() {
            this.li_name.unshift(this.li_name[5]);//list->the frist
            this.li_name.pop();//delete the last arr
            for(var i=0;i<this.li_name.length;i++)
            {
                this.list[i].setAttribute("class",this.li_name[i]);
                //set li new classtag
            }
            this.$options.methods.line_color.bind(this)();
        },
        pre_img(){
            this.li_name.push(this.li_name[0]);//the frist->last
            this.li_name.shift();//delete the frist
            for(var i=0;i<this.li_name.length;i++)
            {
                this.list[i].setAttribute("class",this.li_name[i]);
            }
            this.$options.methods.line_color.bind(this)();
        },
        line_color(){
            var line=document.querySelectorAll("div.linebar>ul>li");
            var li=document.querySelectorAll("div.imgbox>ul>li");
            var len=line.length;
            var k=0;
            var x=$(".list2").children("img").attr("src");
            //var img="<img "+"src="+"\""+x+"\""+">"
            //$(".ba").append(img);
            $(".ba").css("background-image","url(" + x + ")");
            for(var i of li)
            {
                if(i.classList[0]=="list2")
                {
                    for(var h=0;h<6;h++)
                    {
                        line[h].style.cssText = "background-color:rgba(0,0,0,0.1);"
                    }
                    line[k].style.cssText = "background-color:grey;"
                }
                k++;

            }
        },
        show(){
            var move=setInterval(this.pre_img,3000);
            /*$(".imgbox").mouseenter(function () {
                clearInterval(move);
            });
            $(".imgbox").mouseleave(function () {
                move=setInterval(this.pre_img(),3000);
            });*/
        }
    }
}
</script>
<style scoped>
  .container
  {
    position: relative;
    margin: 0 auto;
    width: auto;
    height:9rem;
  }
  .imgbox
  {
    cursor: pointer;
    position: relative;
    margin: 0 auto;
    width:30rem;
    height:90%;
    overflow: hidden;
  }
  .imgbox ul
  {
    display: flex;
    overflow: hidden;
    position: relative;
    top:1rem;
  }
  .imgbox ul li img
  {
    display: block;
    position: relative;
    width:10rem;
    border-radius: 10px;
  }

  .imgbox li{
    cursor: pointer;
    transition: 0.5s;
    list-style: none;
  }
  .linebar
  {
    position: relative;
    top:0.3rem;
    margin:0 auto;
    width:10rem;
    height:8%;
    z-index: 1;
  }
  .list1
  {
    position:absolute;
    transform: translateX(2rem)scale(0.8);
    z-index: 1;
  }
  .list2
  {
    position: absolute;
    transform: translateX(10rem);
    z-index: 2;
  }
  .list3
  {
    position:absolute;
    transform: translateX(18rem)scale(0.8);
    z-index: 1;
  }
  .list4{
    position:relative;
    transform: translateX(31rem);
  }
  .list5{
    position:relative;
    transform: translateX(31rem);
  }
  .list6{
    position:relative;
    transform: translateX(31rem);
  }
  .linebar ul
  {
    display:flex;
  }
  .linebar ul li
  {
    cursor: pointer;
    display: inline;
    width: 16.7%;
    height: 0.08rem;
    background-color: gray;
    background-color:rgba(0,0,0,0.1);
    margin-left:0.1rem;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    transition: 0.5s;
  }
  .go {
    top: 3.5rem;
    left: 2rem;
    position: relative;
    width: 1rem;
    height: 1rem;
    z-index: 10;
    opacity: 0.7;
    background: url("http://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -94px 50%;
  }
  .back {

    left: 27rem;
    top: -4.5rem;
    position: relative;
    width: 1rem;
    height: 1rem;
    z-index: 10;
    background: url("http://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -95px 50%;
    transform:rotate(180deg);

  }

  .ba{
    cursor: pointer;
    position:relative;
    margin: 0 auto;
    width: 100%;
    height: 10rem;
    top:-10rem;
    filter: blur(5px);
    background-size: 100% 100%;
  }
  .ba img
  {
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: 1121px) {
    .container {
      position: relative;
      margin: 0 auto;
      width: auto;
      height: 10rem;
    }

    .imgbox {
      cursor: pointer;
      position: relative;
      margin: 0 auto;
      width: 20rem;
      height: 90%;
      overflow: hidden;
    }

    .imgbox ul {
      display: flex;
      overflow: hidden;
    }

    .imgbox ul li img {
      display: block;
      position: relative;
      width: 8rem;
      border-radius: 10px;
    }

    .imgbox li {
      cursor: pointer;
      transition: 0.5s;
      list-style: none;
    }

    .linebar {
      position: relative;
      top: 0.3rem;
      margin: 0 auto;
      width: 10rem;
      height: 8%;
      z-index: 1;
    }

    .list1 {
      position: absolute;
      transform: translateX(0rem) scale(0.8);
      z-index: 1;
    }

    .list2 {
      position: absolute;
      transform: translateX(6rem);
      z-index: 2;
    }

    .list3 {
      position: absolute;
      transform: translateX(12rem) scale(0.8);
      z-index: 1;
    }

    .list4 {
      position: relative;
      transform: translateX(31rem);
    }

    .list5 {
      position: relative;
      transform: translateX(31rem);
    }

    .list6 {
      position: relative;
      transform: translateX(31rem);
    }

    .linebar ul {
      display: flex;
    }

    .linebar ul list {
      cursor: pointer;
      display: inline;
      width: 16.7%;
      height: 0.08rem;
      background-color: gray;
      background-color: rgba(0, 0, 0, 0.1);
      margin-left: 0.1rem;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      transition: 0.5s;
    }

    .go {
      top: 3.5rem;
      left: 2rem;
      position: relative;
      width: 1rem;
      height: 1rem;
      z-index: 10;
      opacity: 0.7;
      background: url("http://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -94px 50%;
    }

    .back {

      left: 27rem;
      top: -4.5rem;
      position: relative;
      width: 1rem;
      height: 1rem;
      z-index: 10;
      background: url("http://i1.mifile.cn/f/i/2014/cn/icon/icon-slides.png") no-repeat -95px 50%;
      transform: rotate(180deg);

    }

    .ba {
      cursor: pointer;
      position: relative;
      margin: 0 auto;
      width: 100%;
      height: 8rem;
      top: -11rem;
      filter: blur(5px);
      background-size: 100% 100%;
    }

    .ba img {
      height: 100%;
      width: 100%;
    }

    .ba {
      width: 100%;
    }

  }
</style>