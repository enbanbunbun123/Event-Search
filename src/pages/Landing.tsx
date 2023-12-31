import { useNavigate } from "react-router-dom";
import SignInGuest from "../components/SignInGuest";
import "../stylesheet/landing.scss";

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <div className="Landing">
        <div className="Landing__wrapper">
          <img className="Landing__image" src="images/event2.jpg" alt=""></img>
          <div className="Landing__overlay">
            <div className="Landing__text">
              <div className="Landing__text__title">
                Event Search へようこそ！
              </div>
              <div className="Landing__text__contents">
                PC,スマートフォンでいつでもどこでも全国のイベントを投稿・検索できます。あなたも始めてみませんか？
              </div>
              <div className="Landing__SignIn" onClick={navigateToSignIn}>
                サインイン
              </div>
              <SignInGuest />
            </div>
          </div>
        </div>
        <div className="Landing__concept">
          <div className="Landing__concept__title">Concept</div>
          <ol className="Landing__concept__content">
            <li>
              <span>Event Searchについて</span>
              <p>
                本webサービスはコロナによって開催されなくなったイベントや開催されるようになったイベントをユーザー間で共有することを目的としています。
              </p>
              <p>
                有名なイベントからローカルなイベントまで、幅広く投稿可能で、いいね数の多いイベントはユーザーの興味関心の高いイベントとして認知することができます。
              </p>
            </li>
          </ol>
        </div>
        <div className="Landing__contents">
          <div className="Landing__contents__title">Contents</div>
          <ol className="Landing__contents__content">
            <li>
              <span>イベントの投稿・閲覧</span>
              <p>
                googleでサインインをすると、イベントの投稿と閲覧が可能です。
              </p>
              <p>
                投稿できるイベントは有名なものからローカルなものまで投稿可能です。
              </p>
            </li>
            <li>
              <span>ゲストモードでの閲覧</span>
              <p>ゲストモードではサインインをせずに投稿の閲覧が可能です。</p>
              <p>
                ※ゲストモードでは、投稿へのいいねはできますが、イベントの投稿はできませんので、ご注意ください。
              </p>
            </li>
            <li>
              <span>投稿へのいいね機能</span>
              <p>googleでの認証、匿名認証ともに投稿へのいいねが可能です。</p>
              <p>
                月間のいいねの数により投稿がランキング表示されるので、人気のイベントをチェックすることができます。
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Landing;
