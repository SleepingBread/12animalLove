const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const endPoint = 12;

function calResult(){
  var result = select.indexOf(Math.max(...select));
  return result;
} // calResult()

function setResult(){
  let point = calResult();
  const resultName = document.querySelector(".resultName");
  resultName.innerHTML = infoList[point].name; // resultName 노출
 
  var resultImg = document.createElement("img");
  const imgDiv = document.querySelector("#resultImg");
  
  var imgUrl = "./img/image-" + point + ".png";
  resultImg.src = imgUrl;
  resultImg.alt = point;

  resultImg.classList.add("img-fluid");
  imgDiv.append(resultImg);
  

  const resultDesc = document.querySelector(".resultDesc");
  resultDesc.innerHTML = infoList[point].desc;

} // setResult()

function goResult(){
  //qna를 끈다음에 result를 보이게
    qna.style.Animation = "fadeOut 1s"
    qna.style.WebkitAnimation = "fadeOut 1s"
    setTimeout(() => {
      result.style.Animation = "fadeIn 1s"
      result.style.WebkitAnimation = "fadeIn 1s"
      setTimeout(() => {
        qna.style.display = "none";
        result.style.display = "block";
      }, 450)});
      setResult();
      
  } // goResult()

function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector(".answerBox");
  var answer = document.createElement("button");
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('fadeIn');
  
  answer.style.backgroundColor = "#EDEDED";
  answer.style.border = "0px";
  answer.style.display = "block"; // 왜 얘가 없으면 버튼 중앙정렬이 안되지?
  answer.style.width = "500px";
  answer.style.height = "70px";
  answer.style.padding = "none";
  a.appendChild(answer);
  answer.innerHTML = answerText;

  // click Event
  answer.addEventListener("click", function(){
    var children = document.querySelectorAll(".answerList");
    for(i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.Webkitanimation = "fadeOut 0.5s"
      children[i].style.Animation = "fadeOut 0.5s"
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }
      for(i = 0; i < children.length; i++){
        children[i].style.display = "none";
      }
      goNext(++qIdx);
    }, 450);
  }, false);

} // addEnswer()


function goNext(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var qNum = document.querySelector('.qNumber');
  var q = document.querySelector(".qBox");
  q.innerHTML = qnaList[qIdx].q;
  
  // 진행상황 알림
  qNum.innerHTML = (qIdx + 1) + "/" + (endPoint); 

  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }  // answerBox 반복문

  var status = document.querySelector('.statusbar');
  status.style.width = (100 / endPoint) * (qIdx + 1) + "%";
} // goNext()


function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";

  setTimeout(() => {
    main.style.WebkitAnimation = "fadeIn 1s";
    main.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none"; // main 안보이게
      qna.style.display = "block"; // qna 노출
    }, 450);

    let qIdx = 0;
    goNext(qIdx);
  }, 450); // begin()

}