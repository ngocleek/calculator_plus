import React from 'react';

export function formatExpression(expression) {
  const parts = expression.split(/([+\-*/])/); // Split by operators

  return parts.map((part, index) => {
    // If it's an operator, add <wbr /> before it
    if (["+", "-", "*", "/"].includes(part)) {
      const operatorSymbol = part === "*" ? "×" : part === "/" ? "÷" : part;
      return (
        <span key={index} className="px-0.5">
          <wbr />
          {operatorSymbol}
        </span>
      );
    }
    // Return the number or part of the expression as is
    return <span key={index}>{part}</span>;
  });
}

// Thêm hàm này để lấy text thuần túy cho dialog
export function formatExpressionAsString(expression) {
  const parts = expression.split(/([+\-*/])/);
  return parts.map(part => {
    if (part === "*") return "×";
    if (part === "/") return "÷";
    return part;
  }).join('');
} 