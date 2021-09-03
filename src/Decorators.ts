export function szydera(target: any, name: string, descriptor: any){
    let tab = ["cienko idzie", "hehe pudełko", "tak dalej", "LAMA!!!", "NOOB", "YEH!","zycze milego dnia"]
   
    window.setInterval(function(){
        var el:string = tab[Math.floor(Math.random() * tab.length)];
        //console.log(el)
        document.getElementById("szydera").innerText = el
    },1000)
    
}

export function strajk(target: any, name: string, descriptor: any){
    window.setInterval(function(){
        document.getElementById("strajk").style.backgroundImage=""
        setTimeout(function(){
            document.getElementById("strajk").style.backgroundImage = "url('./src/strajk.png')"
        },100)
    },200)
    
}