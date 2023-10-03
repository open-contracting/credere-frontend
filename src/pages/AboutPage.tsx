import { useT } from '@transifex/react';

import ArrowInCircleIcon from '../assets/icons/arrow-in-circle.svg';
import './AboutPage.css';

function About() {
  const t = useT();

  return (
    <div className="home-container">
      <div className="home-section-intro">
        <div className="home-hero">
          <div className="home-content">
            <h1 className="home-title">{t('We break barriers')}</h1>
            <span className="home-caption">
              {t('CREDERE is a financial solution to open opportunities for small businesses in public procurement')}
            </span>
          </div>
        </div>
      </div>

      <div className="home-sections">
        <div className="home-section">
          <div className="home-image" />
          <div className="home-content1">
            <h2 className="home-text01">{t('Why CREDERE?')}</h2>
            <span className="home-text02">
              <span>
                {t(
                  'The public procurement market in Colombia exceeds $150 billion. But almost 70% of small and medium-sized businesses have not obtained external financing from financial institutions, limiting their ability to grow and develop.',
                )}
              </span>
              <br />
              <br />
              <span>
                {t(
                  "This represents a unique opportunity for business growth and the promotion of the country's economic development.",
                )}
              </span>
            </span>
          </div>
        </div>
        <div className="home-section" />
      </div>
      <div className="home-sections1">
        <div className="home-section2">
          <div className="home-image2" />
          <div className="home-content2">
            <h2 className="home-text07">{t('The solution')}</h2>
            <span className="home-text08">
              <span>{t('CREDERE is an innovative tool developed by the Open Contracting Partnership.')}</span>
              <br />
              <br />
              <span>
                {t(
                  'It is the first solution in the region that allows small businesses to gain access to financial products to fulfill public contracts and be more competitive.',
                )}
              </span>
              <br />
            </span>
          </div>
        </div>
        <div className="home-section" />
      </div>
      <div className="home-stats">
        <div className="home-stat">
          <span className="home-caption1">$150</span>
          <span className="home-description">
            <span className="home-text">{t('billions of pesos in annual value of public contracts')}</span>
            <span />
          </span>
        </div>
        <div className="home-stat">
          <span className="home-caption1">78%</span>
          <span className="home-description">
            <span className="home-text">{t('of SMEs has never won a public contract')}</span>
            <span />
          </span>
        </div>
        <div className="home-stat">
          <span className="home-caption1">45%</span>
          <span className="home-description">
            <span className="home-text">{t('cannot assume financial costs')}</span>
            <span />
          </span>
        </div>
        <div className="home-stat">
          <span className="home-caption1">89%</span>
          <span className="home-description">
            <span className="home-text">{t('used informal credits')}</span>
            <span />
          </span>
        </div>
      </div>
      <div className="home-get-started">
        <div className="home-content5">
          <div className="home-heading2">
            <h2 className="home-text38">{t('Do you want to know more?')}</h2>
            <span className="home-text39">
              {t('Are you a financial institution and want to be part of this innovation?')}
            </span>
          </div>
          <div className="home-hero-buttons">
            <a href="/login">
              <div className="home-ios-btn">
                <img alt="pastedImage" src={ArrowInCircleIcon} className="home-apple" />

                <span className="home-caption5">{t('Contact us to join')}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;
