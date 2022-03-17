import { trigger, transition, state, animate, style, keyframes, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { bounceOutLeftAnimation, fadeInAnimation } from 'src/app/shared/animations/animations';

export const peopleAnimations = [
    trigger('peopleAnimationTransform', [
      transition(':enter', [
        group([
          query('h1', [
            style({ transform: 'translateY(-20px)' }),
            animate(1000)
          ]),
          query('tr', 
            stagger(200, animateChild()))
        ])
      ])
    ]),

    trigger('peopleAnimationFadeIn', [
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
