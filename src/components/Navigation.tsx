import { useMe } from './providers/MeProvider';
import { useCallback, useState } from 'react';
import { useAuth } from './providers/AuthProvider';
import UserProfile from './UserProfile';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { isDef } from '@/technical/isDef';
import { useNavigate } from 'react-router-dom';
import Paths from '@/technical/Paths';
import { Home } from '@mui/icons-material';

const Navigation = () => {
	const auth = useAuth()
	const me = useMe()
	const navigate = useNavigate()
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [profileOpen, setProfileOpen] = useState(false)

	const handleOpenUserMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	}, []);

	const handleCloseUserMenu = useCallback(() => {
		setAnchorElUser(null);
	}, []);

	return (
		<AppBar position="static" sx={{ backgroundColor: "rgb(124, 187, 18)", borderColor: "green", borderStyle: "groove" }}>
			<UserProfile userId={me.id} open={profileOpen} onClose={() => setProfileOpen(false)} />
			<Container maxWidth="xl">
				<Toolbar disableGutters>

					<Box sx={{ flexGrow: 1, alignItems: "center", display: "flex", }}>
						<IconButton onClick={() => navigate(Paths.Home)}>
							<Home />
						</IconButton>
						<Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate(Paths.Pong)}>
							JOUER
						</Button>
						<Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={() => navigate(Paths.Leaderboard)}>
							Leaderboard
						</Button>
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Stack direction="row" alignItems="center" spacing={2}>
							<Typography>
								{me.name}
							</Typography>
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar src={me.pic} />
							</IconButton>
						</Stack>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={isDef(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={() => {
								handleCloseUserMenu()
								setProfileOpen(true)
							}}>
								<Typography textAlign="center">Profil</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleCloseUserMenu()
									navigate(Paths.Settings)
								}}
							>
								<Typography textAlign="center">Paramètres</Typography>
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleCloseUserMenu()
									auth.logout()
								}}
							>
								<Typography textAlign="center" color="red">
									Se déconnecter
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navigation;