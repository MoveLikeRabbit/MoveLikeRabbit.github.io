/*
* @Author: Administrator
* @Date:   2017-07-06 17:57:11
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-12 01:17:21
*/

'use strict';
// 开始界面的JS
$(function () {
    var begin=$('.begin'); // 开始界面
	// 选择难度界面的返回按钮
	$('.quit:first').click(function(){
		begin.show();
        $('.difficult').hide();
	})
    // 点击开始游戏
    $('.start').click(function(){
        begin.hide();
        time(5,100);   
    })
    // 倒计时函数
    function time(num,time){
    	$('.count').show();
        var n = 1;
        $('.number').each(function(index,val){
        	$(val).delay(1000*(n++)).animate({opacity:0}, 5,function(){
        		if(index == 2){
        			$('.count').hide();
        			$('.box').show();
        			new typeGame(num,time).init();
        			// 倒计时结束后创建实例化对象
        		}
        	});
        })   
    }
    // 选择难度
    $('.choose').click(function(){
        begin.hide();
        $('.difficult').show();
    })

  	// 控制音乐
    $('.music').click(function(){ 
        $('audio')[0].pause();
        $(this).css('animation','none');
    })                                       
	// 游戏界面的JS
        // var missBox=document.getElementsByClassName('miss')[0];
        function typeGame(num,time){
        	this.box= $('.box');//字母运动范围
        	this.scoreEle=$('.score');
            this.bestScoreEle=$('.bestScore');
            this.lifeEle=$('.progress');
            this.life=this.lifeEle.width();//获取显示生命值图片的宽
            this.lifeCount=5;
            this.score=0;
            this.bestScore=0;
        	this.obj={};
        	this.t=null;
        	this.time=time;
            this.num=num;
            this.overEle=$('.over');
            this.restart=$('.restart');
            this.restart1=$('.restart1');
            this.quit2=$('.quit:last');
            this.quit3=$('.quit3');
            this.stop=$('.stop');
            this.stopbox=$('.stopbox');
            this.continueBtn=$('.continue');
        }
        typeGame.prototype={
            init: function(){
                for(var i=0;i<this.num;i++){
                    this.createLetter();
                }
                this.t=setInterval(this.move.bind(this), this.time);
                this.restartFn();
                //改变指针的方向，时间函数的指针指向window，从而使move函数中的this指针发生改变
            },
        	createLetter: function(){
        		var item=$('<div>');
        		item.addClass('item');
        		this.box.append(item);
        		do{
        			var letter=String.fromCharCode(Math.floor(Math.random()*26+65));
        		}while(this.obj[letter]);
        		do{
        			var lefts=Math .random()*(this.box.width()-item.width());
        			
        		}while(this.cheackPos(lefts,this.obj,item.width()));
        		var speed=Math.random()*3+1;
        		var tops=-50;
        		this.obj[letter]={lefts,tops,item,speed}
        		item.css({
        			left:lefts+'px',
        			background:`url(sucai/${letter}.png) center center no-repeat /cover`
        		})
        	},
        	cheackPos:function(l,obj,itemWidth){
        		for(var i in obj){
        			if(Math.abs(obj[i].lefts-l)<itemWidth){
        				return true;
        			}
        		}
        		return false;
        	},
        	move:function(){
        		for(var i in this.obj){
        			this.obj[i].item.css('top',this.obj[i].tops+this.obj[i].speed+'px');
        			this.obj[i].tops+=this.obj[i].speed;
        			if(this.obj[i].tops>window.innerHeight-this.obj[i].item.width()){
        				$('.item').remove(this.obj[i].item);
        				delete this.obj[i];
        				this.createLetter();
                        this.lifeCount--;
                        this.lifeEle.width(this.lifeCount*this.life/5);
                        if(this.lifeCount==0){
                            clearInterval(this.t);
                            // document.onkeydown=null;
                            this.overEle.show();
                            if(this.score>=this.bestScore){
                                this.bestScore=this.score;
                                this.bestScoreEle.text(this.bestScore);
                            }
                        } 
        			}
        		}
        		var that=this; 
        		document.onkeydown=function(e){
        			var num=String.fromCharCode(e.keyCode);
        			if(that.obj[num]){
        				console.log(that.box);
        				$('.item').remove(that.obj[num].item);
        				delete that.obj[num];
        				that.createLetter();
                        that.score++;
                        //给两处计分的节点赋值
                        that.scoreEle.text(that.score);
        			}
        		}
        	},
            clear:function(){
                //gameover 之后清除所有的字母，恢复血条，和分数;
                for(let j in this.obj){
                    this.box.remove(this.obj[j].item);
                    delete this.obj[j];  
                } 
                this.lifeCount=5;
                this.lifeEle.width(this.life);
                this.score=0;
                this.scoreEle.eq(0).text(this.score);
            },
            restartFn:function(){
                var that=this;
                this.restart.click(function(){
                    that.overEle.hide();
                    that.clear();
                    that.init();
                })
                this.restart1.click(function(){
                    that.stopbox.hide();
                    that.clear();
                    that.init();
                })
                this.quit2.click(function(){
                    begin.show();
                    that.box.hide();
                    that.overEle.hide();
                    that.clear();
                })
                this.quit3.click(function(){
                    begin.show();
                    that.box.hide();
                    that.stopbox.hide();
                    that.clear();
                })
                this.stop.click(function(){
                    clearInterval(that.t);
                    that.stopbox.show();
                    document.onkeydown = null;
                })
                this.continueBtn.click(function(){
                    that.t=setInterval(that.move.bind(that), that.time);
                    that.stopbox.hide();
                })
            },
        }
    var obj={0:{num:4,time:100},1:{num:6,time:50},2:{num:8,time:30}}
    for(let i in obj){
       $('.anniu>div').each(function(index,val){    
            $(val).click(function(){
            	 $('.difficult').hide();
            	 time(obj[index].num,obj[index].time); 
            })	   
        })
    }

})