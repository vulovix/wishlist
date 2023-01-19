import './style.scss';

const Logo = ({ className = '' }): JSX.Element => (
  <div className={`reactoso logo ${className}`} style={{ backgroundImage: `url(/logo192x192.png)` }} />
);

export default Logo;
