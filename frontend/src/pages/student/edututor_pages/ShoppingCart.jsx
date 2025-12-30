import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { calculateCartTotal } from './../../../utils/cartUtils';

const ShoppingCartComponent = ({ 
    cart, 
    yearlyPurchases, 
    calculateFinalAmount,
    courseData 
}) => {
    const cartTotal = calculateCartTotal(cart);
    const finalAmount = calculateFinalAmount();

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <ShoppingCart className="w-7 h-7 mr-3 text-blue-500" /> Your Cart
            </h2>
            {Object.keys(cart).length === 0 ? (
                <div className="text-center py-10">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300" />
                    <p className="text-gray-500 mt-4">Your cart is empty.</p>
                    <p className="text-sm text-gray-400">Add courses to get started.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto pr-2 space-y-3">
                        {Object.values(cart).map((item) => (
                            <div key={`${item.university}-${item.branch}-${item.code}`} className="flex justify-between items-center text-sm">
                                <div className="flex-1 pr-2">
                                    <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                                    <p className="text-xs text-gray-500">{item.code} | {item.branch.split(' ')[0]}</p>
                                </div>
                                <p className="font-semibold text-gray-700">₹{item.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                    <div className="border-t-2 border-dashed pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal:</span>
                            <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                        </div>
                        {Object.keys(yearlyPurchases).some(key => yearlyPurchases[key]) && (
                            <div className="flex justify-between text-green-600 font-medium">
                                <span>Yearly Discount:</span>
                                <span>- ₹{(cartTotal - finalAmount).toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t mt-2">
                            <span>Total:</span>
                            <span>₹{finalAmount.toLocaleString()}</span>
                        </div>
                    </div>
                    <button className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-green-500 transition-all transform hover:scale-105 shadow-lg">
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShoppingCartComponent;