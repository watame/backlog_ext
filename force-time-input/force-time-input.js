// 時間未入力を許可するステータスを設定
const allowTimeBlankStatus = ["未対応"];

// 保存ボタンなどを取得
const saveButtons = document.querySelectorAll('.button--primary.-w-fixed-small');
// NodeListはmapを利用できないので、配列に変換して対応する
// see: https://blog.sushi.money/entry/2017/04/19/114028
const saveButtonsText = Array.from(saveButtons).map(button => button.textContent);
// チケットステータスの名称が記載されている要素を取得
const ticketStatus = document.querySelector(".status-chosen-wrapper .chzn-container .chzn-single .chzn--item .chzn--icon-text");
// 作業実績時間の取得
const actualHours = document.querySelector(".-actual-hours .ticket__properties-value .form-element .numeric");

// 時間未入力が許可されているステータスかをチェックする
function allowedTimeBlank() {
  return ticketStatus.textContent in allowTimeBlankStatus
}

// 作業時間が未入力ではないかチェック
function preventBlankTime() {
  // 空文字,0は自動的にfalseになるので反転させて条件とする
  const allowBlank = allowedTimeBlank() && !actualHours.value;
  saveButtons.forEach((button, index) => {
    button.disable = allowBlank;
    button.textContent = allowBlank ? saveButtonsText[index] : "実績時間を入力してください";
  });
}

// div要素の監視を行うための設定を実施
// see: https://at.sachi-web.com/blog-entry-1516.html
//MutationObserver（インスタンス）の作成
const mo = new MutationObserver(() => {
  preventBlankTime();
});

//監視する「もの」の指定（必ず1つ以上trueにする）
var config = {
  childList: true,//「子ノード（テキストノードも含む）」の変化
  attributes: true,//「属性」の変化
  characterData: true,//「テキストノード」の変化
};

//監視の開始
mo.observe(ticketStatus, config);
actualHours.addEventListener("change", () => { preventBlankTime; });

// 関数の初回実行
preventBlankTime();
