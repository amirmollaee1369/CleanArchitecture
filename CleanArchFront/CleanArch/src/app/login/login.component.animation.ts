import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from '../shared/animations/animations';
 
export const loginAnimations = [
    trigger('loginAnimationTransform', [
      transition(':enter', [
        group([
          query('.login-form', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('@loginAnimationFadeIn', 
            stagger(200, animateChild()))
        ])
      ])
    ]),

    trigger('loginAnimationFadeIn', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '2s'
          }
        })
      ]),
      transition(':leave', [
        style({ backgroundColor: '#ef5350' }),
        animate(500),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ])
  ];
