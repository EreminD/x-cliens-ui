<script lang="ts">
    import {AuthService} from '../../services/auth.service'

    let login: string;
    let pass: string ;

    async function sendAuth() {
        new AuthService().auth(login, pass)
    }

</script>

<svelte:head>
	<title>Authorization</title>
</svelte:head>
<section>
    <form>
        <label for="login" >Логин</label>
        <input id="login" bind:value={login} placeholder="Логин"/>
        <label for="pass">Пароль</label>
        <input id="pass" bind:value={pass} placeholder="Пароль"/>
        <button on:click={sendAuth}>Войти</button>
    </form>
</section>