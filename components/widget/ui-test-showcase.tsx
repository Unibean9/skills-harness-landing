"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import {
  BellIcon,
  CalendarIcon,
  CheckIcon,
  InfoIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type DemoRow = { id: string; name: string; status: string };

const demoColumns: ColumnDef<DemoRow>[] = [
  { accessorKey: "name", header: "Tên" },
  { accessorKey: "status", header: "Trạng thái" },
];

const demoData: DemoRow[] = [
  { id: "1", name: "Button", status: "OK" },
  { id: "2", name: "Dialog", status: "OK" },
  { id: "3", name: "Select", status: "OK" },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function UiTestShowcase() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [sliderValue, setSliderValue] = useState([40]);
  const [checked, setChecked] = useState(true);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <header className="space-y-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>UI Test</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UI Component Test</h1>
          <p className="mt-2 text-muted-foreground">
            Trang kiểm thử palette Claude và toàn bộ component shadcn/base-nova.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Clay #d97757</Badge>
          <Badge variant="secondary">Terracotta #c96442</Badge>
          <Badge variant="outline">Ivory #faf9f5</Badge>
        </div>
      </header>

      <Section title="Button" description="Các variant và kích thước">
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <PlusIcon />
          </Button>
        </div>
      </Section>

      <Section title="Badge & Alert">
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
        <Alert>
          <InfoIcon />
          <AlertTitle>Thông báo</AlertTitle>
          <AlertDescription>Alert component với palette Claude terracotta.</AlertDescription>
        </Alert>
      </Section>

      <Section title="Form controls">
        <FieldGroup className="max-w-md gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="name@example.com" />
            <FieldDescription>Nhập email để kiểm tra Input.</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="bio">Mô tả</FieldLabel>
            <Textarea id="bio" placeholder="Viết mô tả ngắn..." />
          </Field>
          <Field>
            <FieldLabel>Framework</FieldLabel>
            <Select defaultValue="next">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Frontend</SelectLabel>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field data-invalid>
            <FieldLabel htmlFor="error-input">Input lỗi</FieldLabel>
            <Input id="error-input" aria-invalid placeholder="Có lỗi validation" />
            <FieldError>Trường này là bắt buộc.</FieldError>
          </Field>
        </FieldGroup>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" checked={checked} onCheckedChange={(v) => setChecked(v === true)} />
            <Label htmlFor="terms">Đồng ý điều khoản</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch defaultChecked />
            <Label>Bật thông báo</Label>
          </div>
        </div>

        <RadioGroup defaultValue="clay" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="clay" id="clay" />
            <Label htmlFor="clay">Clay</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="terracotta" id="terracotta" />
            <Label htmlFor="terracotta">Terracotta</Label>
          </div>
        </RadioGroup>

        <div className="max-w-sm space-y-2">
          <Label>Slider — {sliderValue[0]}%</Label>
          <Slider
            value={sliderValue}
            onValueChange={(v) => setSliderValue(Array.isArray(v) ? [...v] : [v])}
            max={100}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>OTP Input</Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Section>

      <Section title="Card & Progress">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Claude Theme</CardTitle>
              <CardDescription>Màu chủ đạo terracotta trên nền ivory/slate.</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={66} className="mb-2" />
              <p className="text-sm text-muted-foreground">Progress bar 66%</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Hành động</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Skeleton</CardTitle>
              <CardDescription>Placeholder loading state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Tabs, Accordion & Collapsible">
        <Tabs defaultValue="components">
          <TabsList>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
          </TabsList>
          <TabsContent value="components" className="text-sm text-muted-foreground">
            47 component trong thư mục components/ui.
          </TabsContent>
          <TabsContent value="tokens" className="text-sm text-muted-foreground">
            Clay, Terracotta, Ivory, Sky, Olive.
          </TabsContent>
          <TabsContent value="forms" className="text-sm text-muted-foreground">
            Field + Input + Select + Checkbox.
          </TabsContent>
        </Tabs>

        <Accordion defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Accordion item 1</AccordionTrigger>
            <AccordionContent>Nội dung accordion mở rộng.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Accordion item 2</AccordionTrigger>
            <AccordionContent>Nội dung accordion thứ hai.</AccordionContent>
          </AccordionItem>
        </Accordion>

        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleTrigger>
            <Button variant="outline">
              {collapsibleOpen ? "Thu gọn" : "Mở rộng"} Collapsible
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
            Nội dung collapsible ẩn/hiện.
          </CollapsibleContent>
        </Collapsible>
      </Section>

      <Section title="Toggle & Avatar">
        <ToggleGroup defaultValue={["bold"]} spacing={1}>
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
          <Toggle aria-label="Toggle italic">
            <SettingsIcon />
          </Toggle>
        </div>
      </Section>

      <Section title="Overlays">
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogDescription>Mô tả dialog overlay.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>Đóng</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant="destructive">Alert Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xác nhận xóa?</AlertDialogTitle>
                <AlertDialogDescription>Hành động này không thể hoàn tác.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction>Xóa</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Sheet>
            <SheetTrigger>
              <Button variant="outline">Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet panel</SheetTitle>
                <SheetDescription>Panel trượt từ cạnh màn hình.</SheetDescription>
              </SheetHeader>
              <SheetFooter>
                <SheetClose>
                  <Button variant="outline">Đóng</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Drawer>
            <DrawerTrigger>
              <Button variant="outline">Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Drawer</DrawerTitle>
                <DrawerDescription>Ngăn kéo mobile-first (Vaul).</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button>Xong</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <PopoverHeader>
                <PopoverTitle>Popover</PopoverTitle>
                <PopoverDescription>Thông tin bổ sung khi click.</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>

          <HoverCard>
            <HoverCardTrigger>
              <Button variant="link">Hover Card</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <p className="text-sm">Nội dung hiện khi hover.</p>
            </HoverCardContent>
          </HoverCard>

          <Tooltip>
            <TooltipTrigger>
              <Button variant="outline" size="icon">
                <BellIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip thông báo</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon />
                Hồ sơ
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon />
                Cài đặt
              </DropdownMenuItem>
              <DropdownMenuCheckboxItem checked>Thông báo email</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Section>

      <Section title="Command & Calendar">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setCommandOpen(true)}>
            <SearchIcon />
            Mở Command Palette
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">
                <CalendarIcon />
                Chọn ngày
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>
        <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
          <Command>
            <CommandInput placeholder="Tìm lệnh..." />
            <CommandList>
              <CommandEmpty>Không tìm thấy.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem onSelect={() => setCommandOpen(false)}>
                  <MailIcon />
                  Email
                </CommandItem>
                <CommandItem onSelect={() => setCommandOpen(false)}>
                  <SettingsIcon />
                  Settings
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Theme">
                <CommandItem onSelect={() => setCommandOpen(false)}>
                  <CheckIcon />
                  Claude Clay
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </Section>

      <Section title="Table & DataTable">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Table</TableCell>
              <TableCell>
                <Badge variant="secondary">OK</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DataTable</TableCell>
              <TableCell>
                <Badge variant="secondary">OK</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DataTable columns={demoColumns} data={demoData} searchKey="name" />
      </Section>

      <Section title="Misc">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            AspectRatio 16:9
          </div>
        </AspectRatio>

        <ScrollArea className="h-24 w-full rounded-md border p-4">
          <p className="text-sm text-muted-foreground">
            ScrollArea — cuộn nội dung dài trong vùng giới hạn chiều cao. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </ScrollArea>

        <Separator />

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              toast.success("Toast thành công", { description: "Sonner với theme Claude dark." })
            }
          >
            Toast Success
          </Button>
          <Button variant="outline" onClick={() => toast.error("Toast lỗi")}>
            Toast Error
          </Button>
        </div>
      </Section>
    </div>
  );
}
