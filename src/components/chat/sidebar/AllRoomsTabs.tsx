import { useState } from 'react'

interface AllRoomsTabsProps {
	rooms: string[]
	setRoomToJoin: (roomToJoin: string) => void
}

export const AllRoomsTabs = ({
	rooms,
	setRoomToJoin
}: AllRoomsTabsProps) => {
	const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);

	const handleRoomClick = (index: number) => {
		if (index === selectedRoomIndex) {
			setSelectedRoomIndex(null);
			setRoomToJoin('');
		} else {
			setSelectedRoomIndex(index);
			setRoomToJoin(rooms[index]);
		}
	};

	return (
		<div>
			<div style={{ padding: '8px 16px' }}>
				<strong>all Rooms</strong>
			</div>
			<div style={{ maxHeight: '150px', overflowY: 'scroll' }}>
				<ul style={{ listStyle: 'none', padding: 0 }}>
					{rooms.map((roomnames, index) => (
						<li
							key={index}
							onClick={() => handleRoomClick(index)}
							style={{
								padding: '8px 16px',
								cursor: 'pointer',
								backgroundColor: selectedRoomIndex === index ? '#f0f0f0' : 'transparent',
							}}
						>
							<span style={{ fontSize: '12px' }}>{roomnames}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}