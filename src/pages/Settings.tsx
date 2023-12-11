import ChangeAvatar from "@/components/Settings/ChangeAvatar";
import UserSettings from "@/components/Settings/Settings";
import { EnableTwoFactor } from "@/components/TwoFactorAuth/Enable2fa";
import { DisableTwoFactor } from "@/components/TwoFactorAuth/Disable2fa";

const Settings = () => {
	return (
		<div>
			<UserSettings />
			<ChangeAvatar />
			<EnableTwoFactor />
            <DisableTwoFactor />
		</div>
	);
};

export default Settings;
