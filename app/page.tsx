import { Button } from "@/components/ui/button";
import { Fetch } from "@/lib/fetch";
import Image from "next/image";

export default async function Page() {

const response = await Fetch({endpoint: "chapters"})

console.log( await response.data)

  return (
    <div>
     asdasd
    </div>


  );
}
