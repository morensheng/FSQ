



var swiperH = new Swiper('.swiper-container-h', {
    loop: true,//图片无限轮播
    autoplay: {
        delay: 2000,//2秒切换一次
    },
    pagination: {
        el: '.swiper-pagination-h',
        clickable: true,
    },
    paginationClickable: true,

    //鼠标按下与回弹调用该方法
    on: {
        // 鼠标按下去清除动画
        touchStart: function () {
            $(".slideInLeft").removeClass("animate__animated animate__slideInLeft");
            $(".slideInRight").removeClass("animate__animated animate__slideInRight");
            $(".slideInUp").removeClass("animate__animated animate__slideInUp");
            $(".slideInDown").removeClass("animate__animated animate__slideInDown");
        },
        // 鼠标回弹添加动画
        touchEnd: function () {
            $(".slideInLeft").addClass("animate__animated animate__slideInLeft");
            $(".slideInRight").addClass("animate__animated animate__slideInRight");
            $(".slideInUp").addClass("animate__animated animate__slideInUp");
            $(".slideInDown").addClass("animate__animated animate__slideInDown");
        },
    }
});


// 鼠标移入横向的分页进行跳转 前提是得写 clickable: true
for (i = 0; i < swiperH.pagination.bullets.length; i++) {
    swiperH.pagination.bullets[i].onmouseover = function () {
        this.click();
    };
}


var swiperV = new Swiper('.swiper-container-v', {
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: true,
    pagination: {
        el: '.swiper-pagination-v',
        clickable: true,
        bulletActiveClass: "swiper-pagination-v-bullet-Act",
    },
    navigation: {
        prevEl: '.Icon_Module_VUp',
        nextEl: '.Icon_Module_VDown',
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    on: {
        //当slide被改变时 获取索引更改导航栏li的动态
        slideChange: function () {
            // 向下滚动导航栏缩小0.2左右
            if (this.activeIndex > 0) {
                $(".TopNav_Mid_Ul>li").animate({
                    lineHeight: "80px"
                })
                $(".TopNav").css("background-color", "rgba(0,0,0,0.5)");

                // 隐藏左下角的模块
                $(".Icon_LeftModule").hide();
            }
            else {
                $(".TopNav").css("background-color", "transparent");
                $(".TopNav_Mid_Ul>li").animate({
                    lineHeight: "100px"
                })

                // 显示左下角的模块
                $(".Icon_LeftModule").show();
            }
            $(".TopNav_Mid_Ul>li").removeClass("TopNav_Mid_Ul_Act");
            $(".TopNav_Mid_Ul>li").eq(this.activeIndex).addClass("TopNav_Mid_Ul_Act");
        },
    }
});

//点击导航栏跳转
function Jump(obj) {
    swiperV.slideTo(obj, 500, false);
}

$(".TopNav_Mid_Ul>li").click(function () {
    Jump($(".TopNav_Mid_Ul>li").index($(this)));
    NavAct($(".TopNav_Mid_Ul>li").index($(this)));
});



// 导航栏鼠标移入的特效
function NavAct(obj) {
    $(".TopNav_Mid_Ul>li").eq(obj).addClass("TopNav_Mid_Ul_Act");
    $(".swiper-pagination-v").find(".swiper-pagination-bullet").removeClass("swiper-pagination-v-bullet-Act");
    $(".swiper-pagination-v").find(".swiper-pagination-bullet").eq(obj).addClass("swiper-pagination-v-bullet-Act");
}

// 移入li 调用NavAct方法 移出li removeClass
$(".TopNav_Mid_Ul>li").mouseenter(function () {
    NavAct($(".TopNav_Mid_Ul>li").index($(this)));
}).mouseleave(function () {
    // 如果只有一个TopNav_Mid_Ul_Act类名则不去除
    if ($(".TopNav_Mid_Ul_Act").length == 1) {
        return false;
    }
    else {
        $(this).removeClass("TopNav_Mid_Ul_Act");
        $(".TopNav_Mid_Ul>li").each(function (x, y) {
            if ($(y).hasClass("TopNav_Mid_Ul_Act")) {
                $(".swiper-pagination-v").find(".swiper-pagination-bullet").removeClass("swiper-pagination-v-bullet-Act");
                $(".swiper-pagination-v").find(".swiper-pagination-bullet").eq(x).addClass("swiper-pagination-v-bullet-Act");
            }
        });
    }
});


// 首页轮播图的鼠标移入事件
$(".swiper-container-h").mouseover(function () {
    //鼠标移入暂停轮播
    swiperH.autoplay.stop();
}).mouseleave(function () {
    //移出后2秒后执行轮播
    setTimeout(() => {
        swiperH.autoplay.start();
    }, 2000);
});



// Loading2秒
window.onload = function () {
    swiperH.autoplay.stop();
    setTimeout(() => {
        $(".Loading").fadeOut(100);
        $(".slideInLeft").eq(0).addClass("animate__animated animate__slideInLeft");
        $(".slideInRight").eq(0).addClass("animate__animated animate__slideInRight");
        swiperH.autoplay.start();
    }, 2000);
}


// 首页右边QQ的移入事件
$(".Icon_RightModule_QQ").mouseenter(function () {
    $(this).addClass("Icon_Opacity");
    $(".Icon_RightModule_PhoneInf").hide();
    $(".Icon_RightModule_QQInf").show();
}).mouseleave(function () {
    $(this).removeClass("Icon_Opacity");
});
// 首页右边电话的移入事件
$(".Icon_RightModule_Phone").mouseenter(function () {
    $(this).addClass("Icon_Opacity");
    $(".Icon_RightModule_QQInf").hide();
    $(".Icon_RightModule_PhoneInf").show();
}).mouseleave(function () {
    $(this).removeClass("Icon_Opacity");
});
//移出触发区域隐藏
$(".QQ_Phone").mouseleave(function () {
    $(".Icon_RightModule_QQInf").hide();
    $(".Icon_RightModule_PhoneInf").hide();
});


//右下角的close点击顺时针旋转45deg
let o = 45;
$(".Icon_RightMoudele_CloseImg").click(function () {
    // $(this).css("transform", "rotate(" + o + "deg)");
    $(".Icon_RightModule").animate({
        right: "-100px"
    });
    o += 45;
    $(this).hide();
    $(this).siblings().show();
});

let v = 15;
$(".Icon_RightMoudele_AddImg").click(function () {
    // $(this).css("transform", "rotate(" + - v + "deg)");
    $(".Icon_RightModule").animate({
        right: "0px"
    });
    v += 15;
    $(this).hide();
    $(this).siblings().show();
});



// 首页左下角向上滚动的文字
function autoScroll(News) {
    $(News).find('.News_Ul').animate({
        marginTop: '-55px'
    }, 1000, function () {
        $(this).css({ marginTop: "0px" });
        let li = $(".News_Ul").children().first().clone()
        $(".News_Ul li:last").after(li);
        $(".News_Ul li:first").remove();
    })
}
$(function () {
    setInterval('autoScroll(".Icon_LeftModule_News_Box")', 3000);
})



// 服务页的动画
$(".VWallPaper1_MainUl>li").mouseenter(function () {
    $(this).find("span").css("color", "#fff");
    $(this).find(".ServerTxt").show();
    ServerLeft($(".VWallPaper1_MainUl>li").index($(this)));
}).mouseleave(function () {
    $(this).find("span").css("color", "#000");
    $(this).find(".ServerTxt").hide();
    ServerRight($(".VWallPaper1_MainUl>li").index($(this)));
});


function ServerLeft(se) {
    $(".VWallPaper1_MainUl>li").eq(se).find("div>div>div:first").animate({
        left: "170px"
    })
    $(".VWallPaper1_MainUl>li").eq(se).find("div>div>div:last").animate({
        left: "0px"
    })
}
function ServerRight(se) {
    $(".VWallPaper1_MainUl>li").eq(se).find("div>div>div:first").animate({
        left: "0px"
    })
    $(".VWallPaper1_MainUl>li").eq(se).find("div>div>div:last").animate({
        left: "-170px"
    })
}

// 案例页的动画
function CaseOver(ca) {
    $(".VWallPaper2_Main_ImgBC").eq(ca).animate({
        top: "0px"
    });
    $(".VWallPaper2_Main>div").eq(ca).find("div:last").animate({
        top: "210px"
    })
};
function CaseOut(ca) {
    $(".VWallPaper2_Main_ImgBC").eq(ca).animate({
        top: "-225px"
    });
    $(".VWallPaper2_Main>div").eq(ca).find("div:last").animate({
        top: "348px"
    })
};

$(".VWallPaper2_Main>div").mouseenter(function () {
    CaseOver($(".VWallPaper2_Main>div").index($(this)));
}).mouseleave(function () {
    CaseOut($(".VWallPaper2_Main>div").index($(this)));
});



// 客户页的动画
$(".VWallPaper3_Main_Ul>li").mouseenter(function () {
    $(this).css("background", "rgba(0, 0, 0, 0.05)")
    ClientUp($(".VWallPaper3_Main_Ul>li").index($(this)));
}).mouseleave(function () {
    $(this).css("background", "rgba(255, 255, 255, 0.3)")
    ClientDown($(".VWallPaper3_Main_Ul>li").index($(this)));
});


function ClientUp(cl) {
    $(".VWallPaper3_Main_Ul>li").eq(cl).find("div:first").animate({
        top: "-320px"
    });
    $(".VWallPaper3_Main_Ul>li").eq(cl).find("div:last").animate({
        top: "0px"
    });
};
function ClientDown(cl) {
    $(".VWallPaper3_Main_Ul>li").eq(cl).find("div:first").animate({
        top: "0px"
    });
    $(".VWallPaper3_Main_Ul>li").eq(cl).find("div:last").animate({
        top: "320px"
    });
};




// 关于页的点击切换
$(function () {
    // 点击简介切换成简介
    $(".LeftBtn_Top").mouseenter(function () {
        $(this).addClass("LeftBtn_Active");
        $(".LeftBtn_Bot").removeClass("LeftBtn_Active");
        $(".VWallPaper6_Main_RightMain_Hon").hide();
        $(".VWallPaper6_Main_RightMain_Intr").fadeIn(500);
    });
    //点击荣耀切换成荣耀
    $(".LeftBtn_Bot").mouseenter(function () {
        $(this).addClass("LeftBtn_Active");
        $(".LeftBtn_Top").removeClass("LeftBtn_Active");
        $(".VWallPaper6_Main_RightMain_Intr").hide();
        $(".VWallPaper6_Main_RightMain_Hon").fadeIn(500);
    });
});



