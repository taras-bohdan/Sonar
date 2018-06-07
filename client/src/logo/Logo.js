import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import './Logo.css';

const styles = theme =>{
  return {
    logo: {
      color: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: 'scale(0.7)'
    },
    logoIcon: {
      position: 'relative',
      animation: 'spin 10s linear infinite'
    },
    pulseElements: {
      position: 'absolute',
      top: '27%',
      left: '27%',
      zIndex: 1,
    },
    pulse: {
      position: 'absolute',
      animation: 'pulse-wave 4s linear infinite both',
      borderRadius: '50%',
    },
    pulse1: {
      border: 'solid 1px rgba(255, 255, 255, 0.25)',
      width: 200,
      height: 200,
      top: -70,
      left: -70,
    },
    pulse2: {
      border: 'solid 1px rgba(255, 255, 255, 0.35)',
      width: 300,
      height: 300,
      top: -120,
      left: -120,
    },
    pulse3: {
      border: 'solid 1px rgba(255, 255, 255, 0.45)',
      width: 400,
      height: 400,
      top: -170,
      left: -170,
    },
    logoText: {
      fontSize: '10em',
      fontWeight: 'bold',
      margin: '0 16px',
    },
  }
};

class Logo extends Component {
  render() {
    return (
      <div className={this.props.classes.logo}>
        <span className={this.props.classes.logoText}>S</span>
        <div className={this.props.classes.logoIcon}>
          <svg width="134px" height="134px" viewBox="0 0 134 134" version="1.1">
            <g id="Login" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Login-page" transform="translate(-741.000000, -463.000000)" stroke="#03DAC6">
                <g id="Logo-text" transform="translate(557.000000, 281.000000)">
                  <g transform="translate(187.000000, 185.000000)">
                    <g id="logo-group">
                      <path
                        d="M17.390685,20.141189 C15.4804594,18.8662429 14.2222222,16.6911711 14.2222222,14.2222222 C14.2222222,10.294864 17.4059751,7.11111111 21.3333333,7.11111111 C24.1899722,7.11111111 26.6531949,8.79552572 27.7839692,11.2253226 C38.082617,4.14446017 50.5573132,0 64,0 C99.346224,0 128,28.653776 128,64 C128,99.346224 99.346224,128 64,128 C28.653776,128 2.84217094e-14,99.346224 2.84217094e-14,64 C2.84217094e-14,47.0264959 6.60752525,31.596262 17.390685,20.141189 Z M17.390685,20.141189 C18.5190563,20.8943003 19.874924,21.3333333 21.3333333,21.3333333 C25.2606916,21.3333333 28.4444444,18.1495804 28.4444444,14.2222222 C28.4444444,13.1515029 28.2078036,12.1360539 27.7839692,11.2253226"
                        id="oval-lg" strokeWidth="5"/>
                      <path
                        d="M34.3822032,97.0426254 C25.3248199,88.918574 19.6266667,77.1247245 19.6266667,64 C19.6266667,39.4932847 39.4932847,19.6266667 64,19.6266667 C88.5067153,19.6266667 108.373333,39.4932847 108.373333,64 C108.373333,65.5879475 108.289922,67.1564133 108.127241,68.7012548 C111.353967,69.3748686 113.777778,72.2354897 113.777778,75.6622222 C113.777778,79.5895804 110.594025,82.7733333 106.666667,82.7733333 C105.870443,82.7733333 105.104783,82.6424728 104.390021,82.4010856 C97.3978836,97.7239629 81.9425887,108.373333 64,108.373333 C57.7181246,108.373333 51.7411338,107.067967 46.3254839,104.713691 C45.1114367,106.896476 42.7815209,108.373333 40.1066667,108.373333 C36.1793084,108.373333 32.9955556,105.18958 32.9955556,101.262222 C32.9955556,99.6824271 33.5107129,98.2229534 34.3822032,97.0426254 Z M108.127241,68.7012548 C107.655835,68.6028438 107.167292,68.5511111 106.666667,68.5511111 C102.739308,68.5511111 99.5555556,71.734864 99.5555556,75.6622222 C99.5555556,78.7933566 101.579235,81.4518353 104.390021,82.4010856 M46.3254839,104.713691 C46.8939631,103.691599 47.2177778,102.514726 47.2177778,101.262222 C47.2177778,97.334864 44.0340249,94.1511111 40.1066667,94.1511111 C37.7591036,94.1511111 35.677231,95.2886673 34.3822032,97.0426254"
                        id="oval-md" strokeWidth="5"/>
                      <circle id="oval-sm" strokeWidth="5" cx="64" cy="64" r="21.3333333"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div className={this.props.classes.pulseElements}>
            <div className={`${this.props.classes.pulse} ${this.props.classes.pulse1}`}/>
            <div className={`${this.props.classes.pulse} ${this.props.classes.pulse2}`}/>
            <div className={`${this.props.classes.pulse} ${this.props.classes.pulse3}`}/>
          </div>
        </div>

        <span className={this.props.classes.logoText}>N</span>
        <span className={this.props.classes.logoText}>A</span>
        <span className={this.props.classes.logoText}>R</span>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Logo);