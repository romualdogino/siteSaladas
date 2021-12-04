// Using a class component, everything works without issue
// export class ComponentToPrint extends React.PureComponent {
//     render() {
//       return (
//         <div>My cool content here!</div>
//       );
//     }
//   }
// import React from 'react';
// // Using a functional component, you must wrap it in React.forwardRef, and then forward the ref to
// // the node you want to be the root of the print (usually the outer most node in the ComponentToPrint)
// // https://reactjs.org/docs/refs-and-the-dom.html#refs-and-function-components
// export const ComponentToPrint = React.forwardRef((props, ref) => {
//   // console.log({props})
//   return (
//     <div ref={ref}>
//       My cool content here!
//     </div>
//   );
// });
