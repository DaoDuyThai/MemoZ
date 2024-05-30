"use client";

import { useState } from "react";




interface PricingPlan {
    name: string;
    features: string[];
    price: string;
    type: string;

}



const PricingPage = () => {
    const pricingPlans: PricingPlan[] = [
        {
            name: 'Free Plan',
            features: ['Discover what Miro can do for you and your team. Always free '],
            price: '0$',
            type: 'Free'
        },
        {
            name: 'Starter Plan',
            features: ['Unlock unlimited and private boards with essential features '],
            price: '10$',
            type: 'Buy Starter'
        },
        {
            name: 'Pro Plan',
            features: ['Scale collaboration beyond your team with advanced features and security'],
            price: '100$',
            type: 'Try it free'
        },
        {
            name: 'Enterprise Plan',
            features: ['Work across your entire organization, with support, security and control, to scale'],
            price: '0$',
            type: 'Contact us'
        }
    ];

    return (
        <div className="mx-auto px-4 pb-16 bg-amber-50 ">

            <h1 className="text-3xl font-bold text-center mb-10 pt-10">Our Pricing Plans</h1>
            <div className="flex flex-wrap justify-center">
                {pricingPlans.map((plan, index) => (
                    <PricingCard key={index} plan={plan} />
                ))}
            </div>
            <div className="container mt-10">
                <EnterpriseGuard />
            </div>
            <div className="container mt-10">
                <img src="blog.png" alt="new" className="rounded-lg border border-black object-cover" />
            </div>
            <div className="container mt-10">
                <ChooseMiro />
            </div>
            <h1 className="text-5xl font-bold text-center mb-10 pt-10">FAQ</h1>
            <div className="container mt-10">
                <Card
                    title="Introducing Memoz?"
                    answer={[
                        "Is a project of group 2, Class 1715NJ - FPT University.",
                        "MemoZ – a multi-user whiteboard designed to help people collaborate and create more effectively.",
                        "MemoZ is a combination of the word Memo it means 'note'. And the letter Z for the whole word means Memory ."
                    ]}
                />
                <Card title="How do I get started?" answer={["When you sign up, you’re on the Free plan by default. The Free plan is designed for teams just starting out with visual collaboration: you can invite as many team members and create as many boards as you want, but only 3 boards will be active and editable at once. For more advanced collaboration functionality, check out our Starter, Business or Enterprise plans."]} />
                <Card title="Can I change the team size?" answer={["Yes, you can change your team size at any point during your subscription. You’ll be charged a prorated fee for adding new users and a refund on your next payment for removing users."]} />
                <Card title="Is my data secure" answer={["Yes, you can change your team size at any point during your subscription. You’ll be charged a prorated fee for adding new users and a refund on your next payment for removing users."]} />
                <Card title="Does Memoz integrate with my existing workflow?" answer={["We have a full list of integrations through our Marketplace here. If you don’t see a tool for your workflow on the list or have an idea"]} />
            </div>

        </div>
    );
};

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    return (
        <div className="flex flex-col  bg-white shadow-md rounded-lg p-6 mb-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-4 border border-black">
            <h3 className="text-lg font-bold mb-4">{plan.name}</h3>
            <ul className="flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="mb-2">{feature}</li>
                ))}
            </ul>
            <div className="flex justify-center items-center">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
            </div>
            <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600">
                {plan.type}
            </button>
        </div>
    );
};

const EnterpriseGuard = (props: any) => {
    return (
        <div className="flex flex-col md:flex-row items-center p-6 bg-gray-100 rounded-lg shadow-md border border-black">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
                <div className="text-4xl font-semibold text-gray-800 mb-4">Optional add-on for Enterprise plans</div>
                <div className="text-2xl font-bold text-blue-600 mb-2">Enterprise Guard</div>
                <div className="text-gray-500 mb-4 text-xl">
                    Find and secure sensitive data, manage the lifecycle of content, and support legal discovery and preservation needs — automatically and at scale
                </div>
                <div className="flex space-x-4">
                    <a href="/contact" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Contact us</a>
                    <a href="##" className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <span className="mr-2">Learn more</span>
                        {/* <span aria-hidden="true">→</span> */}
                    </a>
                </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
                <img src="logo.png" alt="Enterprise Guard" className="rounded-lg  object-cover" />
            </div>
        </div>
    );
};

const ChooseMiro = (props: any) => {
    return (
        <div className="flex flex-col md:flex-row items-center p-6 bg-yellow-200 rounded-lg shadow-md border border-black">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
                <div className="text-4xl font-semibold text-gray-800 mb-4 text-center">Why choose us?</div>

                <div className="text-gray-500 mb-4 text-xl">
                    We build Miro with global security standards in mind, offering enterprise-grade security and compliance, ideate and store their work.
                </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
                <img src="why_miro.png" alt="Enterprise Guard" className="rounded-lg  object-cover" />
            </div>
        </div>
    );
};

const Card = ({ title, answer }: { title: string, answer: string[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className={`flex flex-col bg-gray-200 rounded-lg p-10 mb-4 ${isExpanded ? 'mb-8' : ''}`}>
            <div className="flex items-center justify-between cursor-pointer" onClick={handleToggleExpand}>
                <div className="text-xl ">{title}</div>
                <div className={`transform ${isExpanded ? 'rotate-45' : 'rotate-0'} transition-transform duration-300`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                        <g fill="#050038">
                            <rect x="11" y="5" width="2" height="14" rx="1"></rect>
                            <rect x="5" y="13" width="2" height="14" rx="1" transform="rotate(-90 5 13)"></rect>
                        </g>
                    </svg>
                </div>
            </div>
            {isExpanded && (
                <div className="mt-4">
                    {answer.map((line, index) => (
                        <p key={index} className="text-gray-700">{line}</p>
                    ))}

                </div>
            )}
        </div>
    );
};





export default PricingPage;