import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import AllPioneers from "./pioneers/components/all-pioneers";


export default function Home() {


  return (
    <section className="h-full w-full ">

        <section className="relative py-20 bg-muted">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="صورة بطل"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl font-bold mb-6 text-center ">اكتشف مغامرتك القادمة</h1>
            <div className="max-w-3xl mx-auto flex gap-2">
              <Input placeholder="إلى أين تريد الذهاب؟" className="flex-grow" />
              <Button>
                <SearchIcon className="ml-2 h-4 w-4" /> بحث
              </Button>
            </div>
          </div>
        </section>

        <div className='flex items-center justify-center w-full py-5'>
      <AllPioneers/>
    </div>


    </section>
  );
}
