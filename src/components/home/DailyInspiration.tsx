import Container from "@/components/ui/Container";
import HadithCard from "@/components/home/HadithCard";
import PrayerTimesCard from "@/components/home/PrayerTimesCard";

export default function DailyInspiration() {
  return (
    <section>
      <Container>
        <div className="grid gap-5 lg:grid-cols-2">
          <HadithCard />
          <PrayerTimesCard />
        </div>
      </Container>
    </section>
  );
}
