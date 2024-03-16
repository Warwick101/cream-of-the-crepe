import {
  animate,
  animateChild,
  animation,
  group,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

const fadeAnimation = animation([
  style({
    opacity: '{{ startOpacity }}'
  }),
  animate('{{ duration }}')
]);



export const messageAlertTrigger = trigger('submittedState', [

  state('default', style({
    opacity: '0',
    'transform': 'scale(0)',
    'display': 'block'
  })),
  state('submitted', style({
    opacity: '1',
    'transform': 'scale(1)'
  })),
  state('submittedEnd', style({
    opacity: '0',
    'transform': 'translateY(-60px)',
    'display': 'none',
  })),

  transition('default => submitted', [
    style({
      'transform': 'scale(0.4)',
    }),
    animate('200ms ease-out',
      style({
        opacity: '1',
        'transform': 'scale(1.05)',
      })),
    animate('500ms ease-out'),
    style({
      'transform': 'scale(1)',
    }),
    animate('100ms ease-out'),
  ]),
  transition('submitted => submittedEnd', animate('300ms ease-out')),
]);


export const statusTrigger = trigger('sendState', [
  transition(':enter', [
    group([
      query(':self', [
        animate('400ms ease-out', keyframes([
          style({
            opacity: 1,
            transform: 'scale(.2)',
            offset: 0
          }),
          style({
            opacity: 1,
            transform: 'scale(1.1)',
            offset: 0.8
          }),
          style({
            opacity: 1,
            transform: 'scale(1)',
            offset: 1
          })
        ])),
      ]),

      query('h3', [
        style({
          transform: 'translateX(-50px)',
          opacity: 0
        }),
        animate('800ms cubic-bezier(.83,-0.39,.26,1.38)')
      ]),
      query('.icon', [
        style({
          transform: 'scale(0)',
          opacity: 0
        }),
        animate('800ms cubic-bezier(.83,-0.39,.26,1.38)')
      ]),
      query('p', [
        style({
          transform: 'translateY(-30px)',
          opacity: 0
        }),
        animate('800ms 500ms cubic-bezier(.83,-0.39,.26,1.38)')
      ])
    ])
  ]),

  transition(':leave', [
    query(':self', [
      animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
          transform: 'translateY(0px)',
          offset: 0
        }),
        style({
          opacity: 1,
          transform: 'translateY(20px)',
          offset: 0.6
        }),
        style({
          opacity: 0.8,
          offset: 0.8
        }),
        style({
          opacity: 0,
          transform: 'translateY(-100px)',
          offset: 1
        })
      ])),
    ]),
  ])
]);



export const animateMobileTrigger = trigger('animateState', [

  transition(':enter', [
    group([
      animate('300ms ease-out', keyframes([
        style({
          opacity: 1,
          transform: 'translateX(100vw)',
          offset: 0
        }),
        style({
          opacity: 1,
          transform: 'translateX(0)',
          offset: 1
        })
      ])),
      query('@listState', animateChild()),
    ])
  ]),

  transition(':leave', [
    group([
    animate('500ms ease-out', keyframes([
      style({
        opacity: 1,
        transform: 'translateX(0)',
        offset: 0
      }),
      style({
        opacity: 1,
        transform: 'translateX(-100vw)',
        offset: 1
      })
    ])),
    query('@listState', animateChild()),
    ])
  ])
]);


export const listStateTrigger = trigger('listState', [
  transition(':enter', [
    query('a', [
      stagger(50, [
        animate('0.4s 60ms cubic-bezier(.83,-0.39,.26,1.38)', keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100px)',
            offset: 0
          }),

          style({
            transform: 'translateX(0)',
            opacity: 1,
            offset: 1
          }),
        ]))
      ]),
    ], {optional : true})
  ]),
]);



export const buttonStateTrigger = trigger('buttonState', [
  state('valid', style({
    backgroundColor: '#40b553'
  })),
  state('invalid', style({
    backgroundColor: '#b1b1b1'
  })),
  transition('invalid => valid', [
    group([
      animate('400ms cubic-bezier(.83,-0.39,.26,1.38)', style({
        transform: 'scale(1.1)'
      })),
      animate(200, style({
        backgroundColor: '#40b553'
      }))
    ]),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ]),
  transition('valid => invalid', [
    group([
      animate('400ms cubic-bezier(.83,-0.39,.26,1.38)', style({
        transform: 'scale(.92)'
      })),
      animate(200, style({
        backgroundColor: '#b1b1b1'
      }))
    ]),
    animate(200, style({
      transform: 'scale(1)'
    }))
  ])
]);
