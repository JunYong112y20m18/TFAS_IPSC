var show = document.getElementById("show");
var shooterNum = document.getElementById("shooterNum");
var checkBtn = document.getElementById("checkBtn");
var inputScore = document.getElementById("inputScore");
var total;
var shooter;
var stage;
var shooterMem;
var stageMem;
var nowStage = 1;
var nowShooter = 1;
var stageNum;
var stageNum_rev = 0;
var stageALLPoint = [];
var ansScore = [];
var overAllScore = [];



checkBtn.addEventListener("click", function(){
    shooter = document.getElementById("shooter").value;
    stage = document.getElementById("stage").value;
    for(var i = 0 ; i < stage ; i++){
        for(var j = 0 ; j < shooter ; j++){
            ansScore[i,j] = 0;
            overAllScore[j] = 0;
        }
    }
    shooterNum.innerHTML = `
    <p>Shooter數量:${shooter}</p>
    <p>Stage數量:${stage}</p><br>`;
    shooterMem = shooter;
    stageMem = stage;
    stageNum = stage;
    getALLpoint();
})

function stagePointClick(){
        stageALLPoint[stageNum_rev] = document.getElementById("stagePoint").value * 5;
        shooterNum.innerHTML = shooterNum.innerHTML + `<p>stage${stageNum_rev+1}總分為:${stageALLPoint[stageNum_rev]}</p>`
        stageNum--;
        stageNum_rev++;
        getALLpoint();
}

function getALLpoint(){
    if(stageNum == 0){
        inputScore.innerHTML = getInput();
    }
    else{
        inputScore.innerHTML = `<p>請輸入stage-${stageNum_rev+1}總發數:<input id="stagePoint"></p>
                <button id="stagePointBtn" onclick="stagePointClick()">確認</button>`
    }
}


function getInput(){
    return `<p>輸入Stage-${stageNum+1}(${stageALLPoint[nowStage-1]/5}),Shooter-${nowShooter}成績</p>
            <p>A:<input id="A" list="Alist" >
            <datalist id="Alist">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist></p>
            <p>C:<input id="C" list="Clist">
            <datalist id="Clist">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist></p></p>
            <p>D:<input id="D" list="Dlist">
            <datalist id="Dlist">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist></p></p>
            <p>M:<input id="M" list="Mlist">
            <datalist id="Mlist">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist></p></p>
            <p>N:<input id="N" list="Nlist">
            <datalist id="Nlist">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist></p></p>
            <p>P:<input id="P" list="Plist">
            <datalist id="Plist">
                <option value="0"></option>
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
            </datalist></p></p>
            <p>秒數:<input type="number" id="time"></p>
            <button id="scoreBtn" onclick="scoreClick()">確認</button>`;
}

function scoreClick(){
    var A = document.getElementById("A").value;
    var C = document.getElementById("C").value;
    var D = document.getElementById("D").value;
    var M = document.getElementById("M").value;
    var N = document.getElementById("N").value;
    var P = document.getElementById("P").value;
    var time = document.getElementById("time").value;
    var totalScore = (A * 5) + (C * 3) + D * 1 + M * (-10) + N * (-10) + P * (-10);
    var totalPoints = 0;
    if(time == 0){
        alert("秒數為0(錯誤)");
        inputScore.innerHTML = "" + getInput();
    }
    else{
        totalPoints = (totalScore / time).toFixed(4);
        ansScore[nowStage-1,nowShooter-1] = totalPoints;
        show.innerHTML = show.innerHTML + `<hr><p>Stage:${nowStage} Shooter:${nowShooter}成績如下</p>
        <p>A:${A}</p>
        <p>C:${C}</p>
        <p>D:${D}</p>
        <p>M:${M}</p>
        <p>N:${N}</p>
        <p>P:${P}</p>
        <p>秒數:${time}</p><br>
        <p>總分數為:${totalScore}</p>
        <p>積分為:${totalPoints}</p>`;
        if(stageMem > 1 && shooterMem > 1){
            shooterMem--;
            nowShooter++;
            inputScore.innerHTML = "" + getInput();
        }
        else if(stageMem > 1 && shooterMem == 1){
            stageOver();
            shooterMem = shooter;
            stageMem--;
            nowShooter = 1;
            nowStage++;
            stageNum++;
            inputScore.innerHTML = "" + getInput();
        }
        else if(stageMem == 1 && shooterMem > 1){
            shooterMem--;
            nowShooter++;
            inputScore.innerHTML = "" + getInput();
        }
        else if(stageMem == 1 && shooterMem == 1){
            alert("成績輸入完畢");
            inputScore.innerHTML = "";
            stageOver();
            overALL();
            
        }
    }
}

function stageOver(){
    show.innerHTML = show.innerHTML + `<br><hr><h2>Stage:${nowStage} -PERCENT</h2>`
    var maxScore = ansScore[0,0];
    for(var i = 0 ; i < shooter ; i++){
        maxScore = Math.max(maxScore, ansScore[nowStage-1,i]);
    }
    
    for(var i = 0 ; i < shooter ; i++){
        overAllScore[i] += (ansScore[nowStage-1,i]/maxScore).toFixed(4) * stageALLPoint[nowStage-1].toFixed(4);
        show.innerHTML = show.innerHTML + `<p>Shooter-${i+1}:${((ansScore[nowStage-1,i]/maxScore) * 100).toFixed(2)}% 此Stage得分:${((ansScore[nowStage-1,i]/maxScore).toFixed(4) * stageALLPoint[nowStage-1]).toFixed(4)}</p>`
    }


}

function overALL(){
    var maxScore = overAllScore[0];
    for(var i = 0 ; i < shooter ; i++){
        maxScore = Math.max(maxScore, overAllScore[i]);
    }
    show.innerHTML = show.innerHTML + `<br><hr><h2>OVERALL</h2>`
    for(var i = 0 ; i < shooter ; i++){
        show.innerHTML = show.innerHTML + `<br>Shooter ${i+1} 的總得分為:${(overAllScore[i]).toFixed(4)}為${(overAllScore[i]/maxScore * 100).toFixed(2)}%`
    }
}


