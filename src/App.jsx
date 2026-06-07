import React, { useState, useEffect } from 'react';

// 預設的初始卡牌資料庫
const DEFAULT_CARDS = [
  // ⭐ Level 1: Warm-up（輕鬆破冰）
  { id: 1, stars: 1, text: "今天出門前，你腦中想到的第一件事是什麼？" },
  { id: 2, stars: 1, text: "分享一個你最近聽到，讓你微笑的小故事。" },
  { id: 4, stars: 1, text: "最近有買到什麼讓你覺得「生活被點亮」的小東西嗎？" },
  { id: 5, stars: 1, text: "如果這個週末你有整整 24 小時完全不用看手機，你最想做什麼？" },
  { id: 6, stars: 1, text: "你最喜歡自己住處的哪一個角落？為什麼？" },
  { id: 7, stars: 1, text: "最近有沒有哪一首歌，是你一直在單曲循環的？" },
  { id: 8, stars: 1, text: "如果可以立刻打包行李去一個地方待一週，你想去哪裡？" },
  { id: 9, stars: 1, text: "你上一次發自內心大笑，是因為發生了什麼事？" },
  { id: 10, stars: 1, text: "對你來說，一個完美的週五夜晚需要具備哪些元素？" },
  { id: 31, stars: 1, text: "如果可以擁有一種「生活微能力」（例如倒飲料永遠不會滿出來、或網購絕不踩雷），你想選什麼？" },
  { id: 33, stars: 1, text: "你最喜歡的一款舒壓食物或手搖飲配方是什麼？在什麼心情下最想吃它？" },
  { id: 34, stars: 1, text: "想像一隻最能代表你今天「靈魂狀態」的動物，它現在正在做什麼？" },
  { id: 35, stars: 1, text: "如果你的手機相簿只能保留最後三張照片，你會選擇留下哪三張？" },
  { id: 38, stars: 1, text: "如果可以跟過去或未來的自己通話一分鐘，你會撥給幾歲的自己？" },
  { id: 61, stars: 1, text: "分享一個別人的小動作或細節，會讓你瞬間覺得「這個人好迷人、好加分」？" },
  { id: 62, stars: 1, text: "你理想中的第一次約會，是在什麼樣的地方、做些什麼事？" },
  { id: 63, stars: 1, text: "在感情中，你覺得自己更像是「主動進攻的獵人」還是「默默等待的觀察者」？" },
  { id: 64, stars: 1, text: "你最無法忍受的約會「大地雷」是什麼？對方做了什麼會讓你瞬間冷掉？" },
  { id: 65, stars: 1, text: "你相信「一見鍾情」還是「日久生情」？你過去的經驗多半是哪一種？" },
  { id: 66, stars: 1, text: "回想一下，你情竇初開、第一次真正暗戀一個人的時候是幾歲？當時做了什麼傻事？" },
  { id: 68, stars: 1, text: "當你對一個人有好感時，你最常透過什麼樣的「暗示」或舉動讓對方知道？" },
  { id: 69, stars: 1, text: "你覺得在戀愛中，你是個容易吃醋、佔有慾強的人嗎？通常會為了什麼吃醋？" },

  // ⭐⭐ Level 2: Connection（價值觀與內在想法）
  { id: 11, stars: 2, text: "上一次你覺得被別人真正理解，是什麼時候？" },
  { id: 12, stars: 2, text: "在一段關係中，你最看重的「安全感」是由什麼組成的？" },
  { id: 13, stars: 2, text: "有沒有哪一個日常習慣，是你想改掉卻一直留著的？" },
  { id: 14, stars: 2, text: "當你心情不好、需要獨處時，身邊的人怎麼做會讓你覺得最舒服？" },
  { id: 15, stars: 2, text: "回想一下，你覺得自己在哪個瞬間，真正長成了「大人的模樣」？" },
  { id: 16, stars: 2, text: "你目前生活中，最讓你感到驕傲、但很少對旁人提起的成就清單是什麼？" },
  { id: 17, stars: 2, text: "在選擇朋友或伴侶時，哪一種特質是你絕對無法妥協的？" },
  { id: 18, stars: 2, text: "如果現在可以卸下所有現實責任三個月，你最想去探索什麼？" },
  { id: 19, stars: 2, text: "你覺得你在別人的眼中，最常被誤解的部分是什麼？" },
  { id: 41, stars: 2, text: "在你心中，劃分「好朋友」與「普通朋友」之間那一條隱形的界線是什麼？" },
  { id: 43, stars: 2, text: "當你在社交或工作中感到極度疲憊時，做什麼事情最能讓你瞬間「物理回血」？" },
  { id: 45, stars: 2, text: "如果可以預知未來的一件事，你想知道什麼？又絕對不想知道什麼？" },
  { id: 46, stars: 2, text: "對此時的你而言，怎樣的過法才稱得上是「有意義的一天」？" },
  { id: 47, stars: 2, text: "當你的核心價值觀與親近的人發生衝突時，你通常會選擇據理力爭還是保持沉默？" },
  { id: 48, stars: 2, text: "你相信世界上有「毫無保留的純友誼」嗎？你自己的社交界線劃在哪裡？" },
  { id: 49, stars: 2, text: "如果時光倒流，能讓你重新選擇當年的大學科系或第一份工作，你會走上完全不同的路嗎？" },
  { id: 71, stars: 2, text: "對你來說，愛情的五種語言（言語讚美、精心時刻、送禮、服務行動、身體接觸）中，哪一個最能讓你感受到愛？" },
  { id: 72, stars: 2, text: "你相信世界上有完全契合的「靈魂伴侶（Soulmate）」，還是關係都需要靠後天磨合？" },
  { id: 73, stars: 2, text: "在親密關係中，你需要極高比例的「個人獨立空間」，還是更傾向「兩個人黏在一起」？" },
  { id: 74, stars: 2, text: "當兩人在感情中發生爭執時，你通常是習慣當下把話說清楚，還是需要冷靜和空間的冷處理派？" },
  { id: 75, stars: 2, text: "你覺得在一段健康的感情裡，雙方應該是「高度互補」比較好，還是「極度相似」比較幸福？" },
  { id: 76, stars: 2, text: "你曾在感情中為了迎合、討好對方，而做過最大的妥協或改變是什麼？現在的你怎麼看這件事？" },
  { id: 77, stars: 2, text: "對你而言，一段感情走到需要分手的臨界點，通常是因為發生了什麼事（或踩到什麼底線）？" },
  { id: 78, stars: 2, text: "你覺得談戀愛時，「麵包（經濟與現實條件）」和「愛情（精神與心動感）」的比例，在你心裡各佔多少？" },
  { id: 80, stars: 2, text: "你如何看待「前任」的存在？分手後還可能和對方維持真正的純友誼嗎？" },

  // ⭐⭐⭐ Level 3: Deep（深層情感與真心話）
  { id: 21, stars: 3, text: "如果能對過去的自己說一句話，你想對哪一個時期的自己說？" },
  { id: 22, stars: 3, text: "最近一次讓你偷偷流淚、或感到無比脆弱的瞬間是什麼？" },
  { id: 23, stars: 3, text: "你有沒有任何尚未實現，但想對特定人說的抱歉或遺憾？" },
  { id: 24, stars: 3, text: "你心中目前最大的恐懼或焦慮是什麼？你通常怎麼與它共處？" },
  { id: 25, stars: 3, text: "如果你的生命只剩下最後一個月，有哪段關係是你想立刻去修復或好好的告別？" },
  { id: 26, stars: 3, text: "有沒有一個秘密或想法，是你從來沒有對任何人說過，但今天突然覺得可以分享的？" },
  { id: 27, stars: 3, text: "你曾經受過最深的一道心理傷口是什麼？它如何形塑了今天的你？" },
  { id: 29, stars: 3, text: "在愛人的能力與被愛的能力之間，你覺得自己目前哪一部分更匱乏，或正在練習？" },
  { id: 52, stars: 3, text: "你覺得自己目前最渴望被理解、或是最感到孤獨的部分是什麼？" },
  { id: 53, stars: 3, text: "在一段過去的關係（友情或愛情）中，你曾做過最讓自己後悔或羞愧的一件事是什麼？" },
  { id: 54, stars: 3, text: "如果可以付出一點代價來徹底抹去生命中的某一段記憶，你會選擇抹去嗎？為什麼？" },
  { id: 55, stars: 3, text: "隨著年紀增長，你發現自己身上最像父母（但你小時候其實很抗拒）的特點是什麼？" },
  { id: 56, stars: 3, text: "你上一次對某個重要的人感到極度失望，是因為發生了什麼事？後來是怎麼釋懷的？" },
  { id: 57, stars: 3, text: "如果可以對一個已經不在你生命裡（逝去或失聯）的人說最後一句話，你想說什麼？" },
  { id: 58, stars: 3, text: "你覺得自己是一個容易「放過自己」的人嗎？還是經常在心裡默默審判自己？" },
  { id: 59, stars: 3, text: "聊聊你目前為止的人生中做過最勇敢的一個舉動。當時是什麼支撐著你撐下去？" },
  { id: 60, stars: 3, text: "如果今天就是世界末日，對著坐在這裡的這群人，有什麼話是你現在不說會留下遺憾的？" },
  { id: 84, stars: 3, text: "你曾經在感情中受過最深的一道傷是什麼？這道傷有影響到你後來愛人的能力嗎？" },
  { id: 85, stars: 3, text: "有沒有哪一個關於感情的遺憾，是直到今天，你依然偶爾會在深夜想起、覺得欠對方一個好好告別的？" },
  { id: 87, stars: 3, text: "你曾在愛裡做過最勇敢、連自己都沒想過會這麼瘋狂的一件事是什麼？" },
  { id: 88, stars: 3, text: "你心中最恐懼的「感情結局」是什麼？（例如兩個人不再相愛卻耽誤彼此、或突然冷淡分開）" },
  { id: 89, stars: 3, text: "有沒有哪個瞬間，讓你突然明白「這個人我雖然很愛，但我們真的沒辦法一起走下去了」？" },
  { id: 90, stars: 3, text: "如果現在能傳一封不會被對方已讀、會直接消失在宇宙的簡訊給某位前任或錯過的人，你想打什麼字？" },
  { id: 91, stars: 3, text: "在感情中，你最害怕被另一半看見自己哪一個「差勁、自私或陰暗」的一面？" },
  { id: 92, stars: 3, text: "聊聊你遇過最讓你窒息或受傷的「冷暴力」或「信任崩解」經驗，那如何改變了你後來的防備心？" },
  { id: 93, stars: 3, text: "你曾在「明明兩個人在一起」的親密關係裡，感到無比巨大的孤獨嗎？當時是因為什麼？" },
  { id: 94, stars: 3, text: "你覺得在過往的感情裡，你更常扮演「拯救對方、過度承擔責任」的角色，還是「依賴對方、索取情緒價值」的角色？" },
  { id: 95, stars: 3, text: "有沒有哪一段關係，你明知道那是消耗你、不健康的「毒性關係」，你卻還是耽溺了很久才清醒？" },
  { id: 96, stars: 3, text: "對你來說，肉體上的出軌（一夜情）和精神上的出軌（精神寄託），哪一種更讓你感到靈魂被背叛、絕對無法原諒？" },
  { id: 97, stars: 3, text: "你曾為了留住一個人，而徹底否定過自己的價值、甚至連自己都討厭當下的自己嗎？" },
  { id: 98, stars: 3, text: "如果現在的伴侶（或未來的靈魂伴侶）突然告訴你，他/她此生決定不婚不生且要移居海外，你願意為了愛對方而完全改變自己的人生藍圖嗎？" },
  { id: 99, stars: 3, text: "回想你愛得最痛的那個人，如果可以選擇「這輩子從來沒遇過他/她」，你會選擇抹去這段相遇，還是依然甘願痛這一場？" },
  { id: 100, stars: 3, text: "摸著良心問自己：你覺得你現在愛自己的程度，足夠支撐你去經營一段不委屈、不將就的健康感情嗎？" }
];

export default function App() {
  // 遊戲狀態機: 'HOME' | 'SETUP' | 'GAME' | 'SCORE'
  const [step, setStep] = useState('HOME');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // 記憶型卡牌資料庫 (檢查 localStorage 中有沒有自訂過的版本，沒有就用預設的)
  const [customCards, setCustomCards] = useState(() => {
    const saved = localStorage.getItem('between_us_custom_cards');
    return saved ? JSON.parse(saved) : DEFAULT_CARDS;
  });

  // 當題庫有變動時，自動同步更新到瀏覽器快取
  useEffect(() => {
    localStorage.setItem('between_us_custom_cards', JSON.stringify(customCards));
  }, [customCards]);

  // 玩家與回合設定
  const [playerInput, setPlayerInput] = useState(['', '']);
  const [players, setPlayers] = useState([]);
  const [rounds, setRounds] = useState(3); 
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [turnCount, setTurnCount] = useState(0);

  // 當前遊戲中的抽卡池與當前卡片
  const [cardPool, setCardPool] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [fade, setFade] = useState(true);

  // 設定後台暫存：新增卡牌用
  const [newCardText, setNewCardText] = useState('');
  const [newCardStars, setNewCardStars] = useState(1);

  // --- 玩家名稱增減 ---
  const handleAddPlayer = () => setPlayerInput([...playerInput, '']);
  const handleRemovePlayer = (index) => {
    if (playerInput.length > 2) setPlayerInput(playerInput.filter((_, i) => i !== index));
  };
  const handleInputChange = (index, value) => {
    const newList = [...playerInput];
    newList[index] = value;
    setPlayerInput(newList);
  };

  // --- 自訂題庫管理邏輯 ---
  const handleAddCustomCard = (e) => {
    e.preventDefault();
    if (!newCardText.trim()) return;
    const newCard = {
      id: Date.now(),
      stars: Number(newCardStars),
      text: newCardText.trim()
    };
    setCustomCards([...customCards, newCard]);
    setNewCardText('');
  };

  const handleDeleteCard = (id) => {
    setCustomCards(customCards.filter(card => card.id !== id));
  };

  const handleResetDefaultCards = () => {
    if (window.confirm("Reset to default card database? Your custom cards will be removed.")) {
      setCustomCards(DEFAULT_CARDS);
    }
  };

  // --- 遊戲核心流程 ---
  const startGame = () => {
    const finalPlayers = playerInput.map((name, i) => ({
      id: i,
      name: name.trim() || `Player ${i + 1}`,
      score: 0
    }));
    
    // 如果自訂題庫空了，給予預防錯誤的提示
    if (customCards.length === 0) {
      alert("Please add at least one card in Settings before starting!");
      return;
    }

    setPlayers(finalPlayers);
    setCurrentPlayerIndex(0);
    setTurnCount(0);
    
    // 複製目前最新的自訂題庫至遊戲抽卡池
    const freshPool = [...customCards];
    const randomIndex = Math.floor(Math.random() * freshPool.length);
    const firstCard = freshPool.splice(randomIndex, 1)[0];
    
    setCardPool(freshPool);
    setCurrentCard(firstCard);
    setStep('GAME');
  };

  const nextTurn = (isAnswered) => {
    setFade(false);

    setTimeout(() => {
      let updatedPlayers = players;
      // 1. 如果有回答，立刻在當前聯邦（updatedPlayers）幫當前玩家加上這題的星數（分數）
      if (isAnswered) {
        updatedPlayers = players.map((player, idx) => 
          idx === currentPlayerIndex ? { ...player, score: player.score + currentCard.stars } : player
        );
        setPlayers(updatedPlayers);
      }

      const nextTurnCount = turnCount + 1;
      const totalMaxTurns = updatedPlayers.length * Number(rounds);

      // 檢查遊戲是否結束
      if (nextTurnCount >= totalMaxTurns || cardPool.length === 0) {
        setStep('SCORE');
        return;
      }

      setTurnCount(nextTurnCount);

      const remaining = [...cardPool];
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const nextCard = remaining.splice(randomIndex, 1)[0];

      setCardPool(remaining);
      setCurrentCard(nextCard);
      // 2. 確保分數更新完後，才把棒子交給下一位玩家
      setCurrentPlayerIndex((currentPlayerIndex + 1) % updatedPlayers.length);
      setFade(true);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 font-sans select-none overflow-hidden relative">
      {/* 浪漫氛圍環境微光 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 頂部 Header 與 ⚙️ 設定按鈕 */}
      <header className="w-full flex justify-between items-center py-4 z-20 max-w-sm mx-auto">
        <div className="w-6" /> {/* 排版平衡平衡平衡 */}
        <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-medium">Between Us</span>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 text-lg focus:outline-none"
        >
          ⚙️
        </button>
      </header>

      {/* 主畫面容器 */}
      <main className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center z-10 my-auto">
        
        {/* 1️⃣ HOME 畫面 */}
        {step === 'HOME' && (
          <div className="text-center space-y-12 animate-fade-in">
            <div className="space-y-3">
              <h1 className="text-4xl font-extralight tracking-tight text-zinc-200">Between Us</h1>
              <p className="text-sm text-zinc-400 font-light tracking-wide">Small questions, deeper conversations.</p>
            </div>
            <button onClick={() => setStep('SETUP')} className="w-full py-4 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium tracking-wider hover:bg-zinc-200 active:scale-[0.98] transition-all duration-200 shadow-xl shadow-black/20">
              Start
            </button>
          </div>
        )}

        {/* 2️⃣ SETUP 玩家與回合設定面 */}
        {step === 'SETUP' && (
          <div className="space-y-6 w-full animate-fade-in">
            <div className="text-center space-y-1">
              <h2 className="text-lg font-light text-zinc-300">Who's here?</h2>
              <p className="text-xs text-zinc-500">Add everyone's name to get started (2+ players)</p>
            </div>

            {/* 玩家列表滾動區 */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {playerInput.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    placeholder={`Player ${index + 1}`}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-zinc-600 transition-colors placeholder-zinc-600 text-zinc-200"
                  />
                  {playerInput.length > 2 && (
                    <button onClick={() => handleRemovePlayer(index)} className="p-3 text-zinc-500 hover:text-zinc-300 transition-colors text-sm">✕</button>
                  )}
                </div>
              ))}
            </div>

            {/* 數字回合數選擇控制 */}
            <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-light text-zinc-400">Rounds to play</span>
                <span className="text-[11px] text-zinc-600">Each player gets one turn per round</span>
              </div>
              <input 
                type="number" 
                min="1" 
                max="20"
                value={rounds} 
                onChange={(e) => setRounds(Math.max(1, Number(e.target.value)))}
                className="w-16 px-3 py-2 text-center bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-medium text-orange-400 focus:outline-none focus:border-zinc-600"
              />
            </div>

            <div className="space-y-3 pt-2">
              <button onClick={handleAddPlayer} className="w-full py-3 rounded-xl border border-dashed border-zinc-800 text-xs text-zinc-400 hover:bg-zinc-900/50 transition-colors">
                + Add
              </button>
              <button onClick={startGame} className="w-full py-4 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium tracking-wider hover:bg-zinc-200 active:scale-[0.98] transition-all">
                Begin
              </button>
            </div>
          </div>
        )}

        {/* 3️⃣ GAME 卡牌核心畫面 */}
        {step === 'GAME' && currentCard && (
          <div className="w-full h-[480px] flex flex-col justify-between">
            <div className="text-center space-y-1">
              <div className="text-xs text-orange-400 font-light tracking-widest uppercase">
                {players[currentPlayerIndex]?.name}’s round
              </div>
              <div className="text-xs text-zinc-500 tracking-widest mt-1">
                {'★'.repeat(currentCard.stars)}{'☆'.repeat(3 - currentCard.stars)}
              </div>
            </div>

            {/* 微調 py 讓空間更舒適 */}
            <div className={`flex-1 flex items-center justify-center py-4 transition-opacity duration-300 ${fade ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <p className="text-xl md:text-2xl font-light tracking-wide text-zinc-200 text-center leading-relaxed px-4">
                {currentCard.text}
              </p>
            </div>

            {/* 新增的即時積分看板 */}
            <div className="mb-4 bg-zinc-900/30 border border-zinc-900/60 rounded-xl p-2.5 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {players.map((p, idx) => (
                <div 
                  key={p.id} 
                  className={`text-xs font-light transition-all ${idx === currentPlayerIndex ? 'text-orange-400 font-normal scale-105' : 'text-zinc-500'}`}
                >
                  {p.name}: <span className={idx === currentPlayerIndex ? 'text-orange-300' : 'text-zinc-400'}>{p.score}pt</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => nextTurn(false)} className="py-4 rounded-full border border-zinc-800 text-zinc-400 text-xs tracking-wider hover:bg-zinc-900 hover:text-zinc-300 active:scale-[0.98] transition-all">
                Skip
              </button>
              <button onClick={() => nextTurn(true)} className="py-4 rounded-full bg-zinc-100 text-zinc-950 text-xs font-medium tracking-wider hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-lg">
                Answer
              </button>
            </div>
          </div>
        )}

        {/* 4️⃣ SCORE 結算畫面 */}
        {step === 'SCORE' && (
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-3">
              <h2 className="text-2xl font-extralight text-zinc-300 leading-snug">The conversation comes to a close.</h2>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-[280px] mx-auto">
                Thank you for holding space for one another and sharing stories that often remain unspoken.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 space-y-3 max-h-[180px] overflow-y-auto">
              {players.map((player) => (
                <div key={player.id} className="flex justify-between items-center text-sm font-light">
                  <span className="text-zinc-400">{player.name}</span>
                  <span className="text-orange-400/80">{player.score} pts</span>
                </div>
              ))}
            </div>

            <button onClick={() => setStep('HOME')} className="w-full py-4 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium tracking-wider hover:bg-zinc-200 active:scale-[0.98] transition-all">
              Start another conversation
            </button>
          </div>
        )}
      </main>

      {/* 5️⃣ SETTINGS 題庫管理彈窗 Overlay */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-zinc-950/95 z-50 flex flex-col p-6 animate-fade-in overflow-y-auto">
          <div className="w-full max-w-sm mx-auto flex flex-col h-full justify-between">
            
            <div>
              {/* 彈窗頂部 */}
              <div className="flex justify-between items-center py-4 border-b border-zinc-900 mb-6">
                <h3 className="text-base font-light tracking-wide text-zinc-300">Card Database Settings</h3>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-zinc-500 hover:text-zinc-300 text-sm p-1"
                >
                  Close
                </button>
              </div>

              {/* 表單：新增卡牌 */}
              <form onSubmit={handleAddCustomCard} className="space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-900 mb-6">
                <span className="text-xs text-zinc-500 block font-light">Add New Prompt Card</span>
                <textarea
                  value={newCardText}
                  onChange={(e) => setNewCardText(e.target.value)}
                  placeholder="Type your question here..."
                  rows="2"
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 placeholder-zinc-700 resize-none"
                />
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500 font-light">Level:</span>
                    <select
                      value={newCardStars}
                      onChange={(e) => setNewCardStars(Number(e.target.value))}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg text-xs px-2 py-1 text-orange-400 focus:outline-none"
                    >
                      <option value="1">★☆☆ (Icebreaker)</option>
                      <option value="2">★★☆ (Connection)</option>
                      <option value="3">★★★ (Deep)</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-zinc-200 text-zinc-950 rounded-lg text-xs font-medium hover:bg-zinc-300 transition-all"
                  >
                    + Add Card
                  </button>
                </div>
              </form>

              {/* 列表：目前的自訂卡牌庫 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500 font-light">Current Cards ({customCards.length})</span>
                  <button 
                    onClick={handleResetDefaultCards}
                    className="text-[10px] text-zinc-600 hover:text-rose-400 underline transition-colors"
                  >
                    Reset to Defaults
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {customCards.length === 0 ? (
                    <div className="text-center py-8 text-xs text-zinc-700 font-light italic">No cards available. Add some cards above!</div>
                  ) : (
                    customCards.map((card) => (
                      <div key={card.id} className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-xl flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <div className="text-[10px] text-orange-400 font-mono">{'★'.repeat(card.stars)}</div>
                          <p className="text-xs text-zinc-300 leading-relaxed font-light">{card.text}</p>
                        </div>
                        <button 
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-zinc-600 hover:text-rose-400 p-1 text-xs transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs tracking-wider font-medium hover:bg-zinc-800 transition-all"
              >
                Save & Exit
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 底部保留一片淨空（移除原有的中文宣告文字） */}
      <div className="h-4" />
    </div>
  );
}
