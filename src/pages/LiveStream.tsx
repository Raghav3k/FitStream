import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Send, Users, Heart, Share2, Expand, Settings } from "lucide-react";
import { MOCK_CLASSES, INSTRUCTORS } from "../mockData";
import { Button } from "../components/ui/Button";

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  isHost?: boolean;
}

export function LiveStream() {
  const { id } = useParams();
  const cls = MOCK_CLASSES.find(c => c.id === id);
  const instructor = INSTRUCTORS.find(i => i.id === cls?.instructorId);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "m1", user: "system", text: "Welcome to the chat!" },
    { id: "m2", user: instructor?.name || "Host", text: "We will begin shortly!", isHost: true },
    { id: "m3", user: "Jamie", text: "So excited for this!" },
    { id: "m4", user: "YogaLover99", text: "This sequence is fire! 🔥" },
  ]);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!cls || !instructor) return <div className="p-8 text-center text-text-main">Class not found.</div>;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      user: "Alex D.",
      text: inputText
    }]);
    setInputText("");
  };

  return (
    <div className="flex flex-col lg:flex-row flex-1 overflow-hidden bg-bg-surface transition-colors duration-300">
      <div className="flex flex-1 flex-col relative bg-bg-base p-2 lg:p-6 pb-0 lg:pb-6 transition-colors duration-300">
        <div className="flex-1 relative aspect-video w-full rounded-2xl overflow-hidden bg-bg-panel border border-border-subtle shadow-2xl flex flex-col justify-center">
          <img 
            src={cls.thumbnail} 
            alt="Stream" 
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-[#FF4B4B] text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest tracking-widest shadow-md">Live</span>
            <span className="bg-black/60 shadow-sm backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-transparent flex items-center gap-1"><Users className="h-3 w-3" /> {cls.viewers}</span>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
             <Button size="icon" className="h-8 w-8 rounded-lg bg-black/40 text-white hover:bg-black/60 backdrop-blur-md border border-transparent border-white/10">
               <Share2 className="h-3.5 w-3.5" />
             </Button>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                <div className="w-8 h-8 flex gap-1 justify-center items-center">
                   <div className="w-1.5 h-6 bg-white rounded-full animate-pulse"></div>
                   <div className="w-1.5 h-8 bg-white rounded-full animate-pulse delay-75"></div>
                   <div className="w-1.5 h-6 bg-white rounded-full animate-pulse delay-150"></div>
                </div>
             </div>
          </div>
          
          <div className="absolute bottom-0 inset-x-0 p-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-1 text-white">{cls.title}</h1>
                <p className="text-white/80 text-sm font-medium flex items-center gap-2">
                  <img src={instructor.profileImage} className="h-5 w-5 rounded-full object-cover" alt="" />
                  with {instructor.name} • {instructor.category}
                </p>
              </div>
              <div className="flex gap-2">
                 <Button size="icon" className="h-9 w-9 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-transparent backdrop-blur-md hidden sm:flex">
                  <Settings className="h-4 w-4" />
                </Button>
                 <Button size="icon" className="h-9 w-9 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-transparent backdrop-blur-md hidden sm:flex">
                  <Expand className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Sidebar */}
      <aside className="w-full lg:w-80 xl:w-96 bg-bg-elevated border-l border-border-strong flex flex-col h-64 lg:h-auto border-t lg:border-t-0 shrink-0 transition-colors duration-300">
        <div className="p-4 border-b border-border-strong">
          <h3 className="text-sm font-bold flex items-center justify-between text-text-main">
            Community Chat
            <span className="text-[10px] font-bold text-primary">{cls.viewers} Online</span>
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-1">
              {msg.user === "system" ? (
                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-text-faint my-2">{msg.text}</p>
              ) : (
                <>
                  <p className={`text-[10px] font-bold ${msg.isHost ? 'text-primary' : 'text-text-muted'}`}>
                    {msg.user}
                  </p>
                  <p className="text-xs text-text-main bg-text-main/5 p-3 rounded-r-lg rounded-bl-lg max-w-[90%] leading-relaxed">
                    {msg.text}
                  </p>
                </>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        
        <div className="p-4 border-t border-border-strong">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Send a message..." 
              className="flex-1 bg-text-main/5 border border-border-strong rounded-lg px-3 py-2 text-xs text-text-main placeholder:text-text-faint focus:outline-none focus:border-primary/50 transition-colors"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="px-3 bg-text-main/10 rounded-lg hover:bg-text-main/20 text-text-main transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </aside>
    </div>
  );
}
