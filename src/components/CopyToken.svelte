
<script lang="ts">
	import Button, {Label} from '@smui/button';
	import { userInfo } from '@/store';
	import { findCollabIdByName } from '@helpers/drive';

	let userInfoStored: Oidc.User;
	
	userInfo.subscribe((newUser: Oidc.User) => {
		userInfoStored = newUser;
	});

	function copyToClipboard(text: string) {
		var input = document.createElement('input');
		input.setAttribute('value', text);
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
	}

	function copyToken() {
		copyToClipboard(userInfoStored.access_token);
	}
	findCollabIdByName('Antonel transition to E-Brayns');
</script>



<Button
	on:click={copyToken}
	color={'secondary'}
	variant='raised'
>
	<Label>Token</Label>
</Button>
