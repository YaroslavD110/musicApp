import React from "react";

export default () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    style={{ background: "none" }}
  >
    <g transform="rotate(180 50 50)">
      <rect
        ng-attr-x="{{11.11111111111111 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="15.0424"
        fill="#000000"
        x="6.111111111111111"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.125s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{22.22222222222222 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="39.6559"
        fill="#000000"
        x="17.22222222222222"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.875s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{33.333333333333336 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="72.9061"
        fill="#000000"
        x="28.333333333333336"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.75s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{44.44444444444444 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="72.8878"
        fill="#000000"
        x="39.44444444444444"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.625s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{55.55555555555556 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="40.7543"
        fill="#000000"
        x="50.55555555555556"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.25s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{66.66666666666667 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="50.0162"
        fill="#000000"
        x="61.66666666666667"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.375s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{77.77777777777777 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="57.5733"
        fill="#000000"
        x="72.77777777777777"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="-0.5s"
          dur="1"
        />
      </rect>
      <rect
        ng-attr-x="{{88.88888888888889 - config.width/2}}"
        y="15"
        ng-attr-width="{{config.width}}"
        height="10.9902"
        fill="#000000"
        x="83.88888888888889"
        width="10"
      >
        <animate
          attributeName="height"
          calcMode="spline"
          values="50;75;10;50"
          times="0;0.33;0.66;1"
          ng-attr-dur="{{config.speed}}"
          keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
          repeatCount="indefinite"
          begin="0s"
          dur="1"
        />
      </rect>
    </g>
  </svg>
);
