import { Button } from '@/components/ui/button'

export default function Home() {
  return(
    <div>
      <p className='text-2xl'>Hello Discord Clone</p>
      <Button variant={'outline'} data-x-a='1' asChild>
        <span>hahah</span>
        {/* Click Me */}
      </Button>
    </div>
  )
}
