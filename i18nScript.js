$(document).ready(function() {
    alert("이건 뜨나?");
    i18next.init(
        {
        //   lng: "ko",
        debug: true,
        resources: {
            ko: {
            translation: {
                title: "간편한 타이머",
                content: `온라인 타이머: 시간 관리를 위한 편리한 도구 오늘날의 급변하는
                세상에서 시간 관리는 일상 생활의 중요한 측면입니다. 온라인
                타이머는 시간을 관리하는 편리하고 효율적인 방법으로, 사용자들은
                온라인 타이머를 이용하여, 근무 시간을 관리하거나, 공부할 때의 공부
                시간을 관리할 수 있습니다. 특히, 휴식 시간을 관리할 때에는 매우
                유용합니다. 또한, 컴퓨터에 설치할 필요 없이, 웹 브라우저에서 직접
                접속하여 매우 사용하기 쉽습니다. 온라인 타이머를 사용해 보고 시간
                관리에 어떻게 도움이 되는지 알아보세요.`
            }
            },
            en: {
            translation: {
                title: "Simple Timer",
                content: "have a nice day"
            }
            },
        }
        },
        function(err, t) {
        if (err) {
            console.error(err);
        } else {
            updateContent();
        }
        }
    );
    
    // languageSetting();

    function languageSetting(){
        var laguageCd = navigator.language;
        document.querySelector("select").namedItem(laguageCd).selected = true 
        updateContent()
    };
    
    function updateContent() {
        document.querySelector("title").innerHTML = i18next.t("title");
        document.querySelector("#content-description").innerHTML = i18next.t("content");
    };

    i18next.on("languageChanged", () => {
        updateContent();
    });

    // function alert(){
    //     alert("ddd");
    // }
});
  