'use strict';
const UserNameInput=document.getElementById("user-name");
const assessmentButton = document.getElementById('assessment');
const resultDivided=document.getElementById("result-area");
const tweetDivided=document.getElementById("tweet-area");

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり削除
    element.removeChild(element.firstChild);
  }
}

/*診断処理結果エリアの表示内容　
*/
//入力欄でエンターを押されたときに実行する
UserNameInput.onkeydown=event=>{
  if(event.key==='Enter'){
    //Todoボタンのクリック処理を呼び出す
    assessmentButton.onclick();
  }
}


assessmentButton.onclick = function() {
  
  //console.log('ボタンが押されました');
  const userName =UserNameInput.value;
    if (userName.length===0){
    return;
  }
  
  //診断結果の表示
  removeAllChildren(resultDivided);//診断結果エリアをすべて消す
  
  const header  =document.createElement('h3');//h3タグを作成
  header.innerText="診断結果";//ｈ３タグに診断結果の文字表示
  resultDivided.appendChild(header);//resultareaにｈ3変数を設定

    //診断処理を実行
  const result=assessment(userName);
  
  // 診断結果の表示
  const p =document.createElement('p');
  p.innerText=result;
  resultDivided.appendChild(p);
 
  // ツイートエリア初期化
  removeAllChildren(tweetDivided);

   //atagを作って属性を設定する
  const a =document.createElement('a');//atag
  const href='https://twitter.com/intent/tweet?button_hashtag='
              +encodeURIComponent('あなたのいいところ')
              +'&ref_src=twsrc%5Etfw';
  a.setAttribute('href',href);//atagにセットする
  a.setAttribute('class','twitter-hashtag-button');
  a.setAttribute('data-text',result);
  a.innerText = 'Tweet #あなたのいいところ';
  
  //aタグをHTMLとして追加する
  tweetDivided.appendChild(a);

  //スクリプトタグ作る
  const script =document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);//ここでツイートボタンが表示される

};

//テンプレ
const answers=[
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
 ];

 /**
  * 名前の文字列を渡すと診断結果を返す関数
  * @param(string) userName ユーザー名
  * @return(string)
  */
function assessment(userName){
    //userNmae(文字列)を数値に変換
    //ユーザ名の長さ分だけ足す
    var userNameNumber=0;
    for (let i =0; i<userName.length;i++){
      userNameNumber+=userName.charCodeAt(i);
    }
  
    var userNameNumber=userName.charCodeAt(0)+userName.charCodeAt(1);
    //userName.charCodeAt(i);
    //回答結果の長さ
    var answerNumber=userNameNumber % answers.length;
    var result =answers[answerNumber];
    //result.replace(/\{userName\}/g, userName);
    return result.replace(/\{userName\}/g,userName);//置換

    //todo 診断結果を後から書く
    
}


//console.log(assessment('太郎'));
  
