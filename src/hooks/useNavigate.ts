import { useRouter } from "next/navigation";

export function useNavigate() {
  const router = useRouter();
  return (url: string) => router.push(url);
}
