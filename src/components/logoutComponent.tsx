import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card"
import { Button } from "./ButtonShadcn"

export default function logoutComponent() {
    return(
        <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-xl">Confirme </CardTitle>
          <CardDescription>Vous etes sur de quitte le application</CardDescription>
        </CardHeader>
        <CardContent className="pt-0 grid gap-2">
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Sign Out</Button>
          </div>
        </CardContent>
      </Card>
  
        
    )




}