"use client"

import Loader from './Loader';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Video, Link2, Plus, LinkIcon, Copy, X } from "lucide-react"
import { Button } from '../../components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useSession } from "next-auth/react";
import react, { useEffect, useState } from "react"

const MeetingAction = () => {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [baseUrl, setBaseUrl] = useState("");
    const [generatedMeetingUrl, setGeneratedMeetingUrl] = useState("");
    const router = useRouter();

    const [meetingLink, setMeetingLink] = useState("");


    // Get and store the current application's base URL (e.g., https://example.com)
    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);


    // meeting for later
    const handleMeetingForLater = () => {
        const roomId = uuidv4();
        const url = `${baseUrl}/video-meeting/${roomId}`;
        setGeneratedMeetingUrl(url);
        setIsDialogOpen(true);
        toast.success("meeting link created successfully.")
    }

    // joining meeting
    const handleJoinMeeting = () => {
        if (meetingLink) {
            setIsLoading(true);
            const formatedLink = meetingLink.includes('http') ? meetingLink : `${baseUrl}/video-meeting/${meetingLink}`; // agar user sirf roomId dega toh...we have to make full url
            router.push(formatedLink);
            toast.info("joining meeting...")
        }
        else {
            toast.error("please enter a valid url or link.")
        }
    }


    // instant meeting
    const handleInstantMeeting = () => {
        setIsLoading(true);
        const roomId = uuidv4();
        const meetingUrl = `${baseUrl}/video-meeting/${roomId}`;
        router.push(meetingUrl);
        toast.info("joining meeting...");
    }


    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedMeetingUrl);
        toast.info("meeting link copied successfully");
    }

    return (
        <>
            {isLoading && <Loader />}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="w-full sm:w-auto" size="lg">
                            <Video className="size-5 mr-2" />
                            New meeting
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-auto p-3 gap-3">
                        <DropdownMenuItem className="whitespace-nowrap" onClick={handleMeetingForLater}>
                            <Link2 className="size-5" />
                            create a meeting for later
                        </DropdownMenuItem>

                        <DropdownMenuItem className="whitespace-nowrap" onClick={handleInstantMeeting}>
                            <Plus className="size-5" />
                            start an instant meeting
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex w-full sm:w-auto relative">
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
                        <LinkIcon className="w-4 h-4 text-gray-400" />
                    </span>

                    <Input
                        placeholder="Enter a code or link"
                        className="pl-8 rounded-r-none pr-10"
                        value={meetingLink}
                        onChange={(e) => { setMeetingLink(e.target.value) }}
                    />

                    <Button
                        variant="secondary"
                        className="rounded-l-none"
                        onClick={handleJoinMeeting}
                    >
                        Join
                    </Button>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-normal">
                            Here' your joining information
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col space-y-4 ">

                        <DialogDescription className="text-sm text-gray-600 dark:text-gray-300">
                            Send this to people that you want to meet with. Make sure that you
                            save it so that you can use it later, too.
                        </DialogDescription>

                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-lg ">
                            <span className="text-gray-700 dark:text-gray-200 break-all">
                                {generatedMeetingUrl.slice(0, 30)}...
                            </span>

                            <Button
                                variant="ghost"
                                className="hover:bg-gray-200"
                                onClick={copyToClipboard}
                            >
                                <Copy className="w-5 h-5 text-orange-500" />
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default MeetingAction;
