import React, { useState, useEffect, useRef } from 'react';
import { Store, User as UserIcon, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import './LoginScreen.css';

interface LoginScreenProps {
  userType: string;
  setUserType: (type: 'vendor' | 'supplier' | '') => void;
  setCurrentScreen: (screen: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ userType, setUserType, setCurrentScreen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ phone: '', password: '' });
  const [errors, setErrors] = useState({ phone: '', password: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const lastFocusedFieldRef = useRef<'phone' | 'password' | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setCurrentScreen(`${userType}-dashboard`);
    }
  };

  useEffect(() => {
    const phoneValid = /^\d{10}$/.test(loginData.phone);
    const passwordValid = loginData.password.length >= 10;
    
    setErrors({
      phone: phoneValid || !loginData.phone ? '' : 'Phone must be 10 digits',
      password: passwordValid || !loginData.password ? '' : 'Password must be at least 10 characters'
    });
    
    setIsFormValid(phoneValid && passwordValid);
  }, [loginData.phone, loginData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setLoginData(prev => ({ ...prev, phone: numericValue }));
    } else {
      setLoginData(prev => ({ ...prev, password: value }));
    }
  };

  const updateShadow = () => {
    if (!textRef.current || !lightRef.current || !containerRef.current) return;

    const shadowConfig = {
      layers: 30,
      falloff: 1.0,
      distance: 1.5,
      color: { r: 255, g: 255, b: 255, a: 0.5 },
      blur: 27
    };

    // Set fixed light position (top-left area)
    const fixedLightX = containerRef.current.offsetWidth * 0.3;
    const fixedLightY = containerRef.current.offsetHeight * 0;
    
    lightRef.current.style.left = `${fixedLightX}px`;
    lightRef.current.style.top = `${fixedLightY}px`;

    // Calculate distance from light to text center
    const textRect = textRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    const textCenterX = textRect.left - containerRect.left + textRect.width / 2;
    const textCenterY = textRect.top - containerRect.top + textRect.height / 2;
    
    const distanceX = fixedLightX - textCenterX;
    const distanceY = fixedLightY - textCenterY;

    // Generate multi-layer shadow
    let newShadow = '';
    for (let i = 0; i < shadowConfig.layers; i++) {
      const progress = i / shadowConfig.layers;
      const shadowX = -distanceX * progress * shadowConfig.distance;
      const shadowY = -distanceY * progress * shadowConfig.distance;
      const opacity = Math.pow(1 - progress, shadowConfig.falloff);

      newShadow += (newShadow ? ',' : '') +
        `${shadowX}px ${shadowY}px ${shadowConfig.blur}px rgba(${
          shadowConfig.color.r}, ${shadowConfig.color.g}, ${
          shadowConfig.color.b}, ${opacity})`;
    }
    
    textRef.current.style.textShadow = newShadow;
  };

  useEffect(() => {
    updateShadow();
    window.addEventListener('resize', updateShadow);
    return () => window.removeEventListener('resize', updateShadow);
  }, []);

  // Restore shadow when returning from form
  useEffect(() => {
    if (!userType) {
      setTimeout(updateShadow, 10); // Small delay to ensure DOM is ready
    }
  }, [userType]);

  const UserTypeSelection = () => (
    <div className="selection-container">
      {/* Light source element (hidden but used for calculations) */}
      <div ref={lightRef} id="light" className="light-source"></div>
      
      <div ref={textRef} className="main-title">
        Vendor Setu
      </div>
      <div className="role-title">
        <h2>Choose Your Role</h2>
      </div>
      <div className="button-container">
        <button 
          onClick={() => setUserType('vendor')} 
          className="glass-card"
        >
          <div className="glass-effect"></div>
          <div className="glass-tint"></div>
          <div className="glass-shine"></div>
          <div className="glass-content">
            <div className="glass-text">
              <UserIcon className="icon" /> Vendor
            </div>
            <div className="glass-description">
              Buy fresh supplies for your business
            </div>
          </div>
        </button>

        <button 
          onClick={() => setUserType('supplier')} 
          className="glass-card"
        >
          <div className="glass-effect"></div>
          <div className="glass-tint"></div>
          <div className="glass-shine"></div>
          <div className="glass-content">
            <div className="glass-text">
              <Store className="icon" /> Supplier
            </div>
            <div className="glass-description">
              Sell products to local vendors
            </div>
          </div>
        </button>
      </div>
      
      <svg style={{ display: 'none' }}>
        <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="1" seed="5" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100"
            lighting-color="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="150" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </div>
  );

  const LoginForm = () => {
    // Track focus state
    const handleFocus = (field: 'phone' | 'password') => {
      lastFocusedFieldRef.current = field;
    };

    // Restore focus after state updates
    useEffect(() => {
      if (lastFocusedFieldRef.current) {
        const ref = lastFocusedFieldRef.current === 'phone' 
          ? phoneInputRef 
          : passwordInputRef;
        
        if (ref.current) {
          ref.current.focus();
          // Move cursor to end of input
          const length = ref.current.value.length;
          ref.current.setSelectionRange(length, length);
        }
      }
    }, [loginData]);

    return (
      <div className="form-container">
        <div className="form-card">
          <div className="glass-effect"></div>
          <div className="glass-tint"></div>
          <div className="glass-shine"></div>
          <div className="glass-content">
            <div className="form-header">
              <button 
                onClick={() => setUserType('')} 
                className="back-button"
                type="button"
              >
                <ArrowLeft className="icon" />
              </button>
              <h2>
                {userType === 'vendor' ? 'Vendor Login' : 'Supplier Login'}
              </h2>
            </div>
            
            <form onSubmit={handleLogin} className="auth-form" noValidate>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  ref={phoneInputRef}
                  type="tel" 
                  name="phone"
                  value={loginData.phone}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus('phone')}
                  placeholder="Enter 10 digit phone number"
                  pattern="\d{10}"
                  maxLength={10}
                  required 
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <div className="password-input">
                  <input 
                    ref={passwordInputRef}
                    type={showPassword ? 'text' : 'password'} 
                    name="password"
                    value={loginData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    placeholder="Enter at least 10 characters"
                    minLength={10}
                    required 
                    className={errors.password ? 'error' : ''}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                  >
                    {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                  </button>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={!isFormValid}
              >
                Login as {userType === 'vendor' ? 'Vendor' : 'Supplier'}
              </button>

              <div className="form-footer">
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
                <div className="signup-link">
                  <p>
                    Don't have an account?{' '}
                    <a href="#">Sign up</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="login-screen">
      {!userType ? <UserTypeSelection /> : <LoginForm />}
    </div>
  );
};

export { LoginScreen };