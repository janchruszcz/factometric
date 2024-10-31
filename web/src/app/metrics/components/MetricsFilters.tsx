import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MetricsFiltersProps {
  search: string;
  startDate: string;
  endDate: string;
  category: string;
  granularity: string;
  source: string;
  onSearchChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onGranularityChange: (value: string) => void;
  onSourceChange: (value: string) => void;
}

export const MetricsFilters: React.FC<MetricsFiltersProps> = ({
  search,
  startDate,
  endDate,
  category,
  granularity,
  source,
  onSearchChange,
  onStartDateChange,
  onEndDateChange,
  onCategoryChange,
  onGranularityChange,
  onSourceChange,
}) => (
  <div className="flex gap-2">
    <Input placeholder="Search" onChange={onSearchChange} />
    <Input type="datetime-local" placeholder="Start Date" onChange={onStartDateChange} />
    <Input type="datetime-local" placeholder="End Date" onChange={onEndDateChange} />
    <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger>
            <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
            <SelectItem value="acquisition">Acquisition</SelectItem>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="feature">Feature</SelectItem>
        </SelectContent>
    </Select>
    <Select value={granularity} onValueChange={onGranularityChange}>
        <SelectTrigger>
            <SelectValue placeholder="Select granularity" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="hourly">Hourly</SelectItem>
            <SelectItem value="minute">Minute</SelectItem>
        </SelectContent>
    </Select>
    <Select value={source} onValueChange={onSourceChange}>
        <SelectTrigger>
            <SelectValue placeholder="Select source" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile_app">Mobile App</SelectItem>
            <SelectItem value="api">API</SelectItem>
      </SelectContent>
    </Select>
  </div>
); 