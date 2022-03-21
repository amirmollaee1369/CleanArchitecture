import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from 'src/app/shared/animations/animations';

export const customGridAnimations = [
    trigger('customGridAnimationTransform', [
      transition(':enter', [
        group([
          query('caption', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('tr', 
            stagger(200, animateChild()))
        ])
      ])
    ]),

    trigger('customGridAnimationFadeIn', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1s'
          }
        })
      ]),
      transition(':leave', [
        style({ backgroundColor: '#ef5350' }),
        animate(10),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ]),
    trigger('customFade', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1s'
          }
        })
      ]),
      transition(':leave', [
        animate(10),
        useAnimation(bounceOutLeftAnimation)
      ]),
    ])
  ];
