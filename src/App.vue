<template>
	<div id="app">
	 <router-view></router-view>
   </div>
 </template>
 
 <style>
 #app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   height: 100%;
 }
 
 :root {
   --color-primary-light: #fec163;
   --color-primary-dark: #de4313;
 }
 
 *,
 *::before,
 *::after {
   padding: 0;
   margin: 0;
   box-sizing: border-box;
 }
 
 html {
   font-size: 62.5%;
   overflow: auto;
 }
 
 </style>
 