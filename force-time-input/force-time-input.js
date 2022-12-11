// 時間未入力を許可するステータスを設定
const allowTimeBlankStatus = ["未対応"];

// 保存ボタンなどを取得
const saveButtons = document.querySelectorAll('.button--primary.-w-fixed-small');
// チケットステータスの名称が記載されている要素を取得
const ticketStatus = statusElem.querySelector(".status-chosen-wrapper .chzn-container .chzn-single .chzn--item .chzn--icon-text");
// TODO: 作業実績時間の取得


// 時間未入力が許可されているステータスかをチェックする
function allowedTimeBlank() {
  return ticketStatus.textContent in allowTimeBlankStatus
}

// TODO: 起動時読み込み用の関数の設定

// div要素の監視を行うための設定を実施
// see: https://at.sachi-web.com/blog-entry-1516.html
//MutationObserver（インスタンス）の作成
const mo = new MutationObserver(() => {
  const allowBlank = allowTimeBlankStatus();
  for (button in saveButtons) {
    button.disable = allowBlank;
  }
});

//監視する「もの」の指定（必ず1つ以上trueにする）
var config = {
  childList: true,//「子ノード（テキストノードも含む）」の変化
  attributes: true,//「属性」の変化
  characterData: true,//「テキストノード」の変化
};

//監視の開始
mo.observe(ticketStatus, config);
