/*
* @Author: Administrator
* @Date:   2017-06-15 11:06:07
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-16 08:58:54
*/

'use strict';

$(function(){
	//轮播图
	var wheel=$('.banner')[0];
	var images=$('*img',$('.imgbox')[0]);
	var spotbox=$('.spotbox')[0];
	var spots=$('*li',spotbox);
	WHEEL(wheel,images,spots,3000);

})
 