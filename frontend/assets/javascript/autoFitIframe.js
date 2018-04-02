/**
 * 使同域的iframe宽度撑满其所在容器，并且高度自适应其内容
 *
 * @param {Element} iframe .
 */
function autoFitIframe(iframe) {
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    // 设置iframe宽度
    iframe.style.width = '100%';

    function update() {
        var containerWidth = iframe.parentNode.offsetWidth;
        // 在iphone、ipad等移动浏览器中，为iframe设置width和height样式起不了作用
        // iframe的高宽由其内容决定，故设置iframe中body的宽度来限制iframe高宽
        doc.body.style.width =  + 'px';
        doc.body.style.padding = '0';
        doc.body.style.margin = '0';
        doc.body.style.border = 'none';

        // 自适应iframe高度，确保没有纵向滚动条
        // iphone、ipad等移动浏览会器忽略width/height自适应高度
        // NOTE: 没有支持Quirks mode

        // 确保scrollHeight是iframe所需的最小高度
        iframe.style.height = '0';
        iframe.style.height = Math.max(
            // 其他浏览器
            doc.body.scrollHeight,
            // IE7
            doc.documentElement.scrollHeight
        ) + 'px';
    }
    if (doc.readyState === 'complete') {
        update();
    }

    if (iframe.addEventListener) {
        iframe.addEventListener('load', update, false);
    }
    else if (iframe.attachEvent) {
        iframe.attachEvent('onload', update);
    }
};

$(function() {
    /*$('.iframe iframe').each(function(_, iframe){
        console.log(iframe)
        autoFitIframe(iframe)
    });*/
    var iFrames = Array.prototype.slice(document.getElementsByTagName('iframe'))
    for (var i = 0, len = iFrames.length; i < len; i++) {
        autoFitIframe(iFrames[i]);
    }
})