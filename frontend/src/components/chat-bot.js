import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';

const predefinedResponses = {
  en: {
    greetings: [
      "Hi there! How can I help you today?",
      "Hello! Welcome to our store. What can I assist you with?",
      "Greetings! I'm your shopping assistant."
    ],
    productInquiry: [
      "We have a wide range of products available.",
      "Our product catalog is extensive. What are you looking for?",
      "Great! I can help you find the perfect product."
    ],
    cartHelp: [
      "I can help you manage your shopping cart.",
      "Need assistance with your cart? I'm here to help!",
      "Let me guide you through your cart items."
    ],
    noUnderstand: [
      "Sorry, I didn't quite understand that.",
      "Could you rephrase your question?",
      "I'm having trouble understanding. Can you be more specific?"
    ]
  },
  kh: {
    greetings: [
      "សួស្តី! តើខ្ញុំអាចជួយអ្នកអ្វីថ្ងៃនេះ?",
      "សូមស្វាគមន៍! តើឯងចង់បានជំនួយអ្វី?",
      "សូមជំរាបសួរ! ខ្ញុំជាជំនួយការទិញឥវ៉ាន់របស់អ្នក។"
    ],
    productInquiry: [
      "យើងមានផលិតផលជាច្រើនប្រភេទ។",
      "ខ្ញុំអាចជួយអ្នករកផលិតផលដ៏ល្អបំផុតបាន!",
      "តើអ្នកកំពុងរកអ្វី? មាន់ទៅផលិតផលដៃសំរាប់អ្នក!"
    ],
    cartHelp: [
      "ខ្ញុំអាចជួយអ្នកគ្រប់គ្រងរទេះទំនិញបាន។",
      "ត្រូវការជំនួយជាមួយរទេះទំនិញរបស់អ្នកឬ?",
      "បោះទៅកាន់រទេះរបស់អ្នកទៅ!"
    ],
    noUnderstand: [
      "សូមទោស ខ្ញុំមិនយល់ច្បាស់ទេ។",
      "សូមបញ្ជាក់សំណួររបស់អ្នកម្តងទៀត។",
      "ខ្ញុំមិនបានយល់ចំបាស់ទេ សូមពន្យល់បន្ថែម។"
    ]
  }
};

const Chatbot = ({ products, cart, addToCart, removeFromCart }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today? (សួស្តី! តើខ្ញុំអាចជួយអ្នកយ៉ាងម៉េច?)", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'kh' : 'en');
  };

  const getRandomResponse = (category) => {
    const responses = predefinedResponses[language][category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleUserInput = (e) => {
    if (e.key === 'Enter' && userInput.trim()) {
      sendMessage(userInput);
    }
  };

  const sendMessage = (input) => {
    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    processMessage(input);
    setUserInput('');
  };

  const processMessage = (input) => {
    const lowerInput = input.toLowerCase();
    let response = getRandomResponse('noUnderstand');

    if (['hi', 'hello', 'hey', 'sup', 'សួស្តី'].some(greeting => lowerInput.includes(greeting))) {
      response = getRandomResponse('greetings');
    }
    else if (lowerInput.includes('product') || lowerInput.includes('ផលិតផល')) {
      response = `${getRandomResponse('productInquiry')} We currently have ${products.length} products available.`;
    }
    else if (lowerInput.includes('cart') || lowerInput.includes('រទេះ')) {
      response = language === 'en'
        ? `You have ${cart.reduce((sum, item) => sum + item.quantity, 0)} items in your cart.`
        : `អ្នកមាន ${cart.reduce((sum, item) => sum + item.quantity, 0)} ធាតុនៅក្នុងរទេះ។`;
    }
    else if (lowerInput.includes('add') || lowerInput.includes('buy') || lowerInput.includes('បន្ថែម')) {
      const productKeyword = lowerInput.split(' ').slice(1).join(' ');
      const product = products.find(p => 
        p.name.toLowerCase().includes(productKeyword)
      );

      if (product) {
        addToCart(product);
        response = language === 'en'
          ? `${product.name} added to cart successfully!`
          : `${product.name} ត្រូវបានបន្ថែមទៅក្នុងរទេះដោយជោគជ័យ!`;
      }
    }

    const botMessage = { text: response, sender: "bot" };
    setMessages(prev => [...prev, botMessage]);
  };

  return (
    <div className="chatbot-container" style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '350px',
      height: '500px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      zIndex: 999,
    }}>
      <div className="chatbot-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaRobot style={{ marginRight: '10px', color: '#007bff', height: '28px',width: '28px' }} />
          <h6 style={{ margin: 0,color: '#007BFF' }}>E-Commerce Assistant</h6>
        </div>
        <button 
            onClick={toggleLanguage} 
            style={{
                background: 'none',
                border: '1px solid #007bff',
                color: '#007bff',
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
            }}
            >
            {language === 'en' ? 'ភាសាខ្មែរ' : 'English'}
        </button>
      </div>

      <div 
        className="chatbot-messages" 
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px',
          backgroundColor: '#f1f3f5'
        }}
      >
        {messages.map((msg, index) => (
          <div 
            key={index} 
            style={{
              textAlign: msg.sender === 'bot' ? 'left' : 'right',
              marginBottom: '10px'
            }}
          >
            <div 
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '12px',
                maxWidth: '80%',
                backgroundColor: msg.sender === 'bot' ? '#e9ecef' : '#007bff',
                color: msg.sender === 'bot' ? 'black' : 'white'
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div 
        className="chatbot-input" 
        style={{
          display: 'flex',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px'
        }}
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleUserInput}
          placeholder={language === 'en' ? "Type your message..." : "សរសេរសារបស់អ្នក..."}
          style={{
            flexGrow: 1,
            padding: '8px',
            borderRadius: '20px',
            border: '1px solid #ced4da',
            marginRight: '10px'
          }}
        />
        <button 
          onClick={() => sendMessage(userInput)}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '47px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;