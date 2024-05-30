"use client"

import Card from "@/app/marketing/_components/card";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import MarketingLayout from "./layout";


const cardData = [
    {
        src: '/Whiteboarding.svg',
        title: 'White Board'
    },
    {
        src: '/ScaledPlanning.svg',
        title: 'Scaled Planning'
    },
    {
        src: '/ScaledPlanning.svg',
        title: 'Scaled Planning'
    },
    {
        src: '/ScaledPlanning.svg',
        title: 'Scaled Planning'
    },
    {
        src: '/ScaledPlanning.svg',
        title: 'Scaled Planning'
    },
    {
        src: '/ScaledPlanning.svg',
        title: 'Scaled Planning'
    }
]


const MarketingPage = () => {

    return (
        <div className="space-y-5">
            <h1 className="text-center text-6xl mt-10">Think and create <br /> All in one visual workspace</h1>
            <div className="text-center">Go from brainstorming to execution, all in one place. <br />
                Miro is your team's collaborative online workspace.</div>
            <div className="text-center space-y-5">
                <input type="text" className="border-2 w-full md:w-1/3 rounded-md p-3" placeholder="Enter your email" />
                <br />
                <Button variant={'default'} className="p-5 text-lg">Sign up free</Button>
            </div>
            <h1 className="text-2xl text-center">Don't start from scratch — <br />
                dive right into MemoZ.</h1>
            <div className="flex justify-center">
                <Carousel opts={{
                    align: "start",
                }}
                    className="w-full max-w-sm ">
                    <CarouselContent>
                        {
                            cardData.map((card, index) => (
                                // <div className="flex gap-5 flex-wrap" id="default-carousel" data-carousel="slide">
                                <CarouselItem key={index}><Card src={card.src} title={card.title} /></CarouselItem>
                                // </div>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="flex flex-col md:flex-row md:p-10 items-center">
                <div className="space-y-5 md:w-1/2">
                    <h1 className="text-start text-3xl md:text-4xl">Connect your entire company in a single, secure platform</h1>
                    <div className="text-center sm:text-start">With enterprise-grade security at its core, MemoZ helps organizations approach a Zero Trust Security philosophy. We offer advanced security integrations, robust data residency, governance solutions for sensitive data,
                        and an accessibility program targeting Level AA Success Criteria of WCAG 2.1.</div>
                </div>
                <img src="/Image1.png" alt="Image 1" className="md:w-1/2" />
            </div>
            <div className="flex flex-col md:flex-row md:p-10 md:items-center">
                <div className="space-y-5 mb-2 md:w-1/2">
                    <h1 className="text-start text-3xl md:text-4xl mb-2">Integrated with your favorite tools? Of course.</h1>
                    <div className="text-sm sm:text-start sm:text-base">To make work more efficient, Miro connects dynamically with over 130 tools across your stack
                    Jira, Azure DevOps, Asana, Zoom, Teams, and Slack are just some of them.</div>
                    <br/>
                    <Button variant={'outline'}>Discover more</Button>
                </div>
                <img src="/Image2.svg" alt="Image 2" className="md:w-1/2" />
            </div>
        </div>
    )
}

export default MarketingPage;