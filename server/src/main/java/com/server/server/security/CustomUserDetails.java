package com.server.server.security;


import com.server.server.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class CustomUserDetails implements UserDetails {

    private final User user;

    public CustomUserDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                new SimpleGrantedAuthority(user.getRole())
        );    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }



    // You can customize these according to your needs:
    @Override
    public boolean isAccountNonExpired() {
        return true; // or add your logic here
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // or add your logic here
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // or add your logic here
    }

    @Override
    public boolean isEnabled() {
        return true; // or add your logic here
    }

    // Optional: expose the underlying User entity
    public User getUser() {
        return user;
    }
}

