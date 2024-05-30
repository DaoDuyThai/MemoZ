"use client"

import { useState } from "react";


interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;

}

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FormErrors>({});


    const validate = (): FormErrors => {
        const errors: FormErrors = {};
        if (!name) {
            errors.name = "Name is required";
        }
        if (!email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid";
        }
        if (!phone) {
            errors.phone = "Phone number is required";
        } else if (!/^\d+$/.test(phone)) {
            errors.phone = "Phone number is invalid";
        }
        if (!message) {
            errors.message = "Message is required";
        }
        return errors;
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log({ name, email, phone, message });
            setErrors({});
        }
    };
    return (
        <div className="mx-auto px-4 pb-16 bg-amber-50">
            <div className="flex flex-col container  md:flex-row items-center bg-amber-50 p-6 h-screen">
                <div className="md:w-1/2">
                    <h1 className="text-center mb-4 text-gray-800 text-4xl">Talk to our Sales team</h1>

                    <p className="p-4 text-gray-600 text-xl">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" className="icon icon-ds-200 icon-sw-150 icon-inherit undefined">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m5 11 5 5 9-9"></path>
                            <path stroke="currentColor" stroke-width="2" d="M10 15.9999v.0001"></path>
                        </svg> */}
                        Learn how your team can ramp up productivity with better collaboration.
                    </p>

                    <p className=" p-4 text-gray-600 text-xl">Watch Memoz in action with your own live demo, customized for your business.</p>
                    <p className=" p-4 text-gray-600 text-xl">See what scaling without friction looks like when you use Miro Enterprise to fit your exact needs.</p>
                    <img src="ideas.png" alt="new" className=" p-4 rounded-lg border border-black object-cover" />
                </div>
                <div className="md:w-1/2">
                    <div className="min-h-screen flex items-center justify-center ">
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border border-black">
                            <h4 className="text-2xl text-center mb-6">Fill out this quick form and we’ll get back to you shortly</h4>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                                
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="message" className="block text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mt-1"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                            <button type="submit" className=" bg-blue-500 text-white py-3 px-6 rounded-3xl w-1/2">Contact Us</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ContactPage;