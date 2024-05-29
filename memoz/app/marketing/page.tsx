"use client"

import Card from "@/components/common/card";
import Header from "@/components/common/header";
import { Button } from "@/components/ui/button";
import MarketingTemplate from "@/templates/MarketingLayout";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


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
        <MarketingTemplate className={"text-center bg-[#fcf8f0] space-y-5 p-5"}>
            <h1 className="text-center text-6xl mt-10">Think and create <br /> All in one visual workspace</h1>
            <div className="text-center">Go from brainstorming to execution, all in one place. <br />
                Miro is your team's collaborative online workspace.</div>
            <input type="text" className="border-2 w-1/3 rounded-md p-3" placeholder="Enter your email" />
            <br />
            <Button variant={'default'} className="p-5 text-lg">Sign up free</Button>
            <h1 className="text-2xl">Don't start from scratch — <br />
                dive right into Miro.</h1>
            <div className="flex justify-center">
                <Carousel opts={{
                    align: "start",
                }}
                    className="w-full max-w-sm">
                    <CarouselContent>
                        {
                            cardData.map((card, index) => (
                                // <div className="flex gap-5 flex-wrap" id="default-carousel" data-carousel="slide">
                                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"><Card src={card.src} title={card.title} /></CarouselItem>
                                // </div>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>



        </MarketingTemplate>
    )
}

export default MarketingPage;