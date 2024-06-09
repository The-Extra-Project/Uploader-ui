import {CardHeader, CardContent} from "@/components/Card"

// integrate the API endpoint for setting up the database at the backend

export function LatestEvals() {
    return(
        <>
       <CardHeader>
       Filename: Demo.laz
       </CardHeader>
        <CardContent>
          <h2 className="text-large text-bold text-muted-foreground font-dark">
            total mapLoad tokens: +$1,999.00            
          </h2>
        </CardContent>
        </>
    )
}
