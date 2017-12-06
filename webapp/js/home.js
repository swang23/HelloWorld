var vm = new Vue({
	el: "#main",
	data: {
		items:[],
		pageOne: true,
		pageTwo: false,
		imgWidth: "",
		pageNum: 1,
		num: 1,
		working: false,
		imgs: [
			{
				message: "nihao",
				imgPath: "../img/01(1).jpg",
			},{
				message: "nihao",
				imgPath: "../img/01(1).jpg",
			},{
				message: "nihao",
				imgPath: "../img/01(1).jpg",
			},{
				message: "nihao",
				imgPath: "../img/01(1).jpg",
			},
		],
	},
	methods: {
		ifBottom: function(){
			var $this = this;
			var scrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
    		var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    		var dis = 0;
    		if( $(".item")[$(".item").length-1]==undefined ){
    			return;
    		}
    		if( $this.pageNum==1 ){
    			var dis = $(".item")[$(".item").length-1].offsetTop;
    		}else if( $this.pageNum==2 ){
    			var dis = $(".imgBlock")[$(".imgBlock").length-1].offsetTop;	
    		}
			if( (scrollHeight+pageHeight)>dis ){
				return 1;
			}
		},
		changePage: function($index){
			var $this = this;
			$this.pageNum = $index;
			switch($index){
				case 1:
					$this.pageOne = true;
					$this.pageTwo = false;
					break;
				case 2:
					$this.pageOne = false;
					$this.pageTwo = true;
					break;
				case 3:
					break;
			}
		},
		load: function(){
			var $this = this;
			if($this.working){
				return;
			}
			$this.working = true;
			$.ajax({
				url: 'http://10.86.16.51:8081/getData',
				type: 'POST',
				data: {
					num: $this.num,
				},
				success: function(data){
					var tempData = data.ret;
					for( var i = 0; i < tempData.length; i++ ){
						var tempItem = {
							img: tempData[i].itemCover,
							text: tempData[i].itemText,
							num: "139",
							title: tempData[i].itemTitle,
							url: tempData[i].itemLink
						}
						$this.items.push(tempItem);
					}
					$this.num++;
					$this.working = false;
					//localStorage.items=JSON.stringify($this.items);
					//localStorage.num=$this.num;
				}
			})
		}
	},
	ready: function(){
		var $this = this;
		var width = document.body.clientWidth;
		$this.imgWidth = (width-45)/2+"px";
		//if(localStorage.num!=undefined&&localStorage.num!=null){
		//	$this.items = JSON.parse(localStorage.items);
		//	$this.num = localStorage.num;
		//	window.onscroll=function(){
		//        if( $this.ifBottom() ){
		//            $this.load();
		//        }
	    //	}
		//	return;
		//}
		$this.load();
		window.onscroll=function(){
	        if( $this.ifBottom() ){
	            $this.load();
	        }
    	}
    }
})