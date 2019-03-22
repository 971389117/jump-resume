// 把code写到#code 和 style 标签里
let b=0
function writeCss(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    b+=1
    domCode.innerHTML = prefix || ''
    let n = 0;
    let id = setInterval(() => {
        n += 1;

        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css, 'css');
        styleTag.innerHTML = prefix + code.substring(0, n)
        domCode.scrollTop = domCode.scrollHeight
        if (n >= code.length) {
            clearInterval(id)
            fn && fn.call()
        }
    }, 0)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0;
    let id = setInterval(() => {
        n += 1;
        domPaper.innerHTML =markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight
        if (n >= markdown.length) {
            clearInterval(id)
            fn && fn.call()
        }
    }, 0)
}

function createPaper(fn) {
    let paper = document.createElement('div')
    paper.setAttribute('id', 'paper')
    let content = document.createElement('pre')
    content.className = 'content'
    paper.append(content)
    document.body.append(paper)
    fn && fn.call()
}


let css1 = `
/*
面试官你好，我是郑昕
我将以动画的形式来介绍我自己
只用文字介绍太单调了
我就用代码来介绍吧
首先准备一些样式
*/

*{
    transition:all 1s;
}
html{
    background:rgb(222,222,222);
}
body{
    font-size:18px;
    display:flex;
}
#code{
    box-sizing: border-box;
    height: 100vh;
    width: 50vw;
    padding:16px;
    border:1px solid red;
    overflow: scroll;
}

/* 我需要一些代码高亮 */
.token.comment{
    color:slategray
}
.token.selector{
    color: #690;
}
.token.property{
    color: #905
}
.token.punctuation{
    color:#999
}
.token.function{
    color:#DD4A68
}

/* 加点 3D 效果*/
#code{
    transform:rotate(360deg);
}

/*
    不玩了，我来介绍一下我自己吧。
    我需要一张白纸
*/
#paper{
    width:100px;height:100px;
    background:red;
    width:50vw;
    height:100vh;
    background:white;
    box-sizing:border-box;
    border:10px solid black;
    overflow:scroll;
}
`
let css2 = `


/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */

    `

    let css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */`

let md = `
# 自我介绍

我叫 XXX,1991年9月出生。自学前端一年,希望应聘前端开发岗位。


# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板

# 联系方式
 - QQ xxxxxxxx
 - Email xxxxxxxx
 - 手机 xxxxxxx

`


// writeCss('', css1, () => {
//     createPaper(() => {
//         writeCss(css1, css2, () => {
//             writeMarkdown(md)
//         })
//     })
// })

//
writeCss('', css1, ()=>{ // writeCss call the function
    createPaper(() => {
      writeMarkdown(md, ()=> {
        writeCss(css1, css2, ()=>{
          convertMarkdownToHtml(()=>{
            writeCss(css1 + css2, css3, ()=> {
              console.log('完成')
            })
          })
        })
      })
    })
  })
function convertMarkdownToHtml(fn){
    let div=document.createElement('div')
    // div.className='html markdown-body'
    div.className = 'html markdown-body'
    div.innerHTML=marked(md)
    let markdownContainer=document.querySelector('#paper>.content')
    markdownContainer.replaceWith(div) //?
    fn&&fn.call()
}
