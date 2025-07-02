import React, { useState, useRef, useEffect } from 'react';

const TimeTrackerHome = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_company: '',
    user_phone: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const formRef = useRef();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.user_name.trim()) {
      errors.user_name = 'Imię i nazwisko jest wymagane';
    }
    
    if (!formData.user_email.trim()) {
      errors.user_email = 'Adres email jest wymagany';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Adres email jest nieprawidłowy';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Wiadomość jest wymagana';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    setFormErrors({});
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({
        user_name: '',
        user_email: '',
        user_company: '',
        user_phone: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add scroll animation effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-slate-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Zarządzaj czasem pracy
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  efektywnie i prosto
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                TimeTracker Pro to nowoczesne rozwiązanie dla małych i średnich firm. 
                Automatyzuj śledzenie czasu, generuj raporty i zwiększ produktywność swojego zespołu o 40%.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
                >
                  Rozpocznij za darmo
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all"
                >
                  Zobacz funkcje
                </button>
              </div>
              
              <div className="flex items-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  14 dni za darmo
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Bez umowy
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Natychmiastowa konfiguracja
                </div>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                  alt="Zespół pracujący z TimeTracker Pro"
                  className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
                />
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Aktywny projekt</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">02:34:21</div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-blue-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">+40%</div>
                    <div className="text-sm text-gray-600">produktywności</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wszystko czego potrzebujesz w jednym miejscu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TimeTracker Pro łączy w sobie moc zaawansowanych funkcji z prostotą użytkowania
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⏱️",
                title: "Automatyczne śledzenie czasu",
                description: "Rozpocznij pracę jednym kliknięciem. System automatycznie śledzi czas poświęcony na projekty i zadania.",
                color: "blue"
              },
              {
                icon: "📊",
                title: "Zaawansowane raporty",
                description: "Generuj szczegółowe raporty czasowe, analizy produktywności i zestawienia dla klientów.",
                color: "green"
              },
              {
                icon: "👥",
                title: "Zarządzanie zespołem",
                description: "Monitoruj postęp całego zespołu, przydzielaj zadania i śledź efektywność pracowników.",
                color: "purple"
              },
              {
                icon: "💰",
                title: "Automatyczne fakturowanie",
                description: "Generuj faktury na podstawie przepracowanych godzin. Pełna integracja z systemami księgowymi.",
                color: "orange"
              },
              {
                icon: "📱",
                title: "Aplikacja mobilna",
                description: "Śledź czas pracy nawet w podróży. Pełna synchronizacja między urządzeniami.",
                color: "pink"
              },
              {
                icon: "🔗",
                title: "Integracje",
                description: "Połącz się z popularnymi narzędziami: Slack, Trello, Asana, Google Calendar i wieloma innymi.",
                color: "indigo"
              }
            ].map((feature, index) => (
              <div key={index} className="animate-on-scroll group">
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group-hover:border-blue-200 h-full">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - reszta sekcji będzie w następnej części */}
    </div>
  );
};

export default TimeTrackerHome;